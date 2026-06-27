import { useEffect } from "react";

/**
 * useOnClickOutside
 * Calls `handler` when a click or touch occurs outside the `ref` element.
 *
 * @param {React.RefObject} ref - element ref to watch
 * @param {(event: Event) => void} handler - callback when outside click detected
 * @param {boolean} enabled - whether the hook is active
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

      // If click is inside the main element, do nothing
      if (el.contains(event.target)) return;

      // If click is inside any of the ignored refs, do nothing
      for (const ignoreRef of ignoreRefs) {
        const ignoreEl = ignoreRef?.current;
        if (ignoreEl && ignoreEl.contains(event.target)) return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, enabled, ...ignoreRefs]);
}
