"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children?: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  from?: "up" | "left" | "right" | "zoom";
  style?: React.CSSProperties;
}

export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  from = "up",
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  const direction =
    from === "up"
      ? ""
      : from === "left"
        ? " reveal-from-left"
        : from === "right"
          ? " reveal-from-right"
          : " reveal-zoom";

  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      className={`reveal${direction}${visible ? " is-revealed" : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
    </Tag>
  );
}
