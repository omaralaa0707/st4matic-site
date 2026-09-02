"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/**
 * This site's arrival: ignition sweep. An element doesn't slide or wipe in —
 * it finds its position the way a gauge needle finds a reading: a short swing
 * past true, then a settle.
 *
 * The reveal is a `data-seen` attribute written straight to the DOM, not
 * React state, so there is nothing to re-render and the observer stays out of
 * the render cycle. It watches the element the animation itself runs on,
 * which only stays safe because the animation touches opacity/transform —
 * never clip-path, which would collapse the intersection rect to zero.
 */
export function useOnScreen<T extends HTMLElement>(rootMargin = "-10% 0px -8% 0px") {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reveal = () => node.setAttribute("data-seen", "");
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [rootMargin]);

  return ref;
}

const delayVar = (delay: number) => ({ "--ignite-delay": `${delay}ms` }) as CSSProperties;

export function Ignite({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  id?: string;
}) {
  const ref = useOnScreen<HTMLElement>();
  const Component = Tag as unknown as (props: Record<string, unknown>) => ReactElement;

  return (
    <Component ref={ref} id={id} data-ignite="" className={className} style={delayVar(delay)}>
      {children}
    </Component>
  );
}

/** The spectrum rule under section headings — charges from its leading edge. */
export function SpecRule({
  className,
  delay = 0,
  thickness = 2,
}: {
  className?: string;
  delay?: number;
  thickness?: number;
}) {
  const ref = useOnScreen<HTMLDivElement>();

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-fill=""
      className={cn(
        "spectrum-rule w-full origin-[left_center] rtl:origin-[right_center]",
        className,
      )}
      style={{ height: thickness, ...delayVar(delay) }}
    />
  );
}
