"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { useWebglHealth } from "@/lib/use-webgl-health";

/**
 * ST4Matic's signature piece.
 *
 * Two of the four cars in the fleet list "Ambient Light Colors" as a spec,
 * and their own photography proves it: a digital cluster ring that glows blue
 * in Comfort and red in Sport, and a violet wash under the door trim. This
 * rebuilds that cluster ring as the page's one recurring 3D object — a radial
 * gauge of ~90 instanced bars, coloured across the same spectrum, that fills
 * as a value rises and carries a needle that swings past its reading and
 * settles, the way a real gauge needle does.
 *
 * It runs in two modes: interactive (the hero drags it directly) and
 * controlled (the financing calculator drives `value` from its sliders).
 */

// A real instrument face: the scale starts at the lower left and fills
// *clockwise* to the lower right, so angles run START - SWEEP·t.
const TICKS = 96;
const START = Math.PI * 1.3; // 234°, lower left
const SWEEP = Math.PI * 1.6; // 288° of travel, ending at -54°
const SPECTRUM = [
  new THREE.Color("#57c6f2"), // blue
  new THREE.Color("#a06bff"), // violet
  new THREE.Color("#ff4a3d"), // red
  new THREE.Color("#ffa23c"), // amber
];

function spectrumAt(t: number) {
  const n = SPECTRUM.length - 1;
  const f = Math.max(0, Math.min(1, t)) * n;
  const i = Math.min(n - 1, Math.floor(f));
  return SPECTRUM[i].clone().lerp(SPECTRUM[i + 1], f - i);
}

function Glow({ colorRef }: { colorRef: RefObject<THREE.Color> }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color("#a06bff") },
      uTime: { value: 0 },
    }),
    [],
  );
  useFrame((state) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value = state.clock.elapsedTime;
    mat.current.uniforms.uColor.value.copy(colorRef.current);
  });
  return (
    <mesh position={[0, 0, -0.05]}>
      <planeGeometry args={[3.2, 3.2]} />
      <shaderMaterial
        ref={mat}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={/* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={/* glsl */ `
          precision highp float;
          varying vec2 vUv;
          uniform vec3 uColor;
          uniform float uTime;
          void main() {
            vec2 p = vUv - 0.5;
            float d = length(p);
            float pulse = 0.5 + 0.5 * sin(uTime * 0.9);
            float a = smoothstep(0.5, 0.0, d) * (0.16 + 0.05 * pulse);
            gl_FragColor = vec4(uColor, a);
          }
        `}
      />
    </mesh>
  );
}

function Ring({
  value,
  targetRef,
}: {
  value: number;
  targetRef: RefObject<number>;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const colorRef = useRef(new THREE.Color("#a06bff"));
  const displayed = useRef(0);

  const geometry = useMemo(() => new THREE.BoxGeometry(0.05, 0.22, 0.05), []);

  useEffect(() => {
    const mesh_ = mesh.current;
    if (!mesh_) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < TICKS; i++) {
      const a = START - (SWEEP * i) / (TICKS - 1);
      const r = 1.15;
      dummy.position.set(Math.cos(a) * r, Math.sin(a) * r, 0);
      dummy.rotation.z = a + Math.PI / 2;
      dummy.updateMatrix();
      mesh_.setMatrixAt(i, dummy.matrix);
    }
    mesh_.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((_, delta) => {
    const mesh_ = mesh.current;
    if (!mesh_) return;
    displayed.current += (value - displayed.current) * (1 - Math.pow(0.001, delta));
    const lit = displayed.current;
    colorRef.current.copy(spectrumAt(lit * 0.85 + 0.05));

    for (let i = 0; i < TICKS; i++) {
      const t = i / (TICKS - 1);
      const on = t <= lit;
      const c = on ? spectrumAt(t) : new THREE.Color("#2a2d33");
      mesh_.setColorAt(i, c);
    }
    if (mesh_.instanceColor) mesh_.instanceColor.needsUpdate = true;
    targetRef.current = colorRef.current.getHex();
  });

  return (
    <instancedMesh ref={mesh} args={[geometry, undefined, TICKS]} frustumCulled={false}>
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

function Needle({ value }: { value: number }) {
  const group = useRef<THREE.Group>(null);
  const angle = useRef(START);
  const velocity = useRef(0);

  useFrame((_, delta) => {
    const target = START - SWEEP * Math.max(0, Math.min(1, value));
    const dt = Math.min(delta, 0.05);
    // A light spring: enough to overshoot a reading and settle, like a real
    // gauge needle, without hand-scripted overshoot keyframes.
    const k = 46;
    const damp = 7.5;
    const accel = (target - angle.current) * k - velocity.current * damp;
    velocity.current += accel * dt;
    angle.current += velocity.current * dt;
    if (group.current) group.current.rotation.z = angle.current - Math.PI / 2;
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0.42, 0]}>
        <coneGeometry args={[0.045, 0.9, 3]} />
        <meshBasicMaterial color="#f2f0ec" toneMapped={false} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.09, 24]} />
        <meshBasicMaterial color="#f2f0ec" toneMapped={false} />
      </mesh>
    </group>
  );
}

function Scene({
  value,
  interactive,
  onDrag,
  onReady,
}: {
  value: number;
  interactive: boolean;
  onDrag?: (v: number) => void;
  onReady: () => void;
}) {
  const { gl, camera } = useThree();
  const glowColor = useRef(new THREE.Color("#a06bff"));
  const targetRef = useRef(0);
  const dragging = useRef(false);

  useEffect(() => {
    onReady();
  }, [onReady]);

  useFrame(() => {
    glowColor.current.setHex(targetRef.current || 0xa06bff);
  });

  const angleToValue = useCallback(
    (clientX: number, clientY: number) => {
      const rect = gl.domElement.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Screen Y grows downward; the dial's angles are in world space.
      let a = Math.atan2(-(clientY - cy), clientX - cx);
      while (a > START) a -= Math.PI * 2;
      while (a < START - Math.PI * 2) a += Math.PI * 2;
      return Math.max(0, Math.min(1, (START - a) / SWEEP));
    },
    [gl],
  );

  useEffect(() => {
    if (!interactive) return;
    const el = gl.domElement;
    const onDown = (e: PointerEvent) => {
      dragging.current = true;
      onDrag?.(angleToValue(e.clientX, e.clientY));
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      onDrag?.(angleToValue(e.clientX, e.clientY));
    };
    const onUp = () => {
      dragging.current = false;
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [interactive, gl, onDrag, angleToValue]);

  useEffect(() => {
    camera.position.set(0, 0, 3.6);
  }, [camera]);

  return (
    <>
      <Glow colorRef={glowColor} />
      <Ring value={value} targetRef={targetRef} />
      <Needle value={value} />
    </>
  );
}

function canRenderWebgl() {
  try {
    const c = document.createElement("canvas");
    return Boolean(
      c.getContext("webgl2") ?? c.getContext("webgl") ?? c.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

export function AmbientDial({
  value,
  interactive = false,
  onDrag,
  alt,
  className,
}: {
  value: number;
  interactive?: boolean;
  onDrag?: (v: number) => void;
  alt: string;
  className?: string;
}) {
  const { lost, bind } = useWebglHealth();
  // Both start deterministically false/null so the client's first hydration
  // pass matches the server-rendered fallback markup exactly; the effect
  // below then probes the real, browser-only answer once mounted. That one
  // synchronous setState is the sanctioned exception to
  // react-hooks/set-state-in-effect — there is no way to know a browser API's
  // answer before an effect runs.
  const [reduced, setReduced] = useState(false);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(canRenderWebgl());
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  if (lost || supported !== true) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={className}
        style={{
          background:
            "radial-gradient(circle, rgba(160,107,255,0.18), transparent 70%)",
          borderRadius: "9999px",
        }}
      />
    );
  }

  return (
    <div className={className} aria-label={alt} role="img">
      <Canvas
        style={{ width: "100%", height: "100%", touchAction: interactive ? "none" : undefined }}
        camera={{ position: [0, 0, 3.6], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => bind(gl.domElement)}
      >
        <Scene
          value={value}
          interactive={interactive && !reduced}
          onDrag={onDrag}
          onReady={onReady}
        />
      </Canvas>
      {!ready && <span className="sr-only">{alt}</span>}
    </div>
  );
}
