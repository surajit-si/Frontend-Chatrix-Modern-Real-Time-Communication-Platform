import { useEffect } from "react";

/**
  useOnClickOutside
  Calls `handler` when a click or touch occurs outside the `ref` element.
 */
export default function useOnClickOutside(
  ref,
  handler,
  enabled = true,
  ignoreRefs = [],
) {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event) => {
      const el = ref?.current;
      if (!el) return;

      const path = event.composedPath?.() ?? [];

      if (path.includes(el)) return;

      for (const ignoreRef of ignoreRefs) {
        const ignoreEl = ignoreRef?.current;
        if (ignoreEl && path.includes(ignoreEl)) return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    document.addEventListener("pointerdown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
      document.removeEventListener("pointerdown", listener);
    };
  }, [ref, handler, enabled, ...ignoreRefs]);
}
