import { useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return { ref, opacity, y };
}

export function useParallaxScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return { ref, y };
}

export function useStackScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 0.8", "1 0.2"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.95]);

  return { ref, opacity, scale };
}
