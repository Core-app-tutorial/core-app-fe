import { useEffect, useState, RefObject } from "react";

export function useIsInViewport<T extends HTMLElement>(
  ref: RefObject<T | null>,
  threshold = 0.1
) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);

  return isIntersecting;
}
