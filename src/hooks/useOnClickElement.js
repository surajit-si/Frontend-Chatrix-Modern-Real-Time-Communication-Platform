import { useEffect } from "react";

/**
 * Parphone a specific task on click, touch of a element.
 * @param {Element} el - Element that on click want to perform a specific event
 * @param {Function} handler - Function that want to perform on the click, get event obj in callback by default
 */
export default function useOnClickElement(ref, handler) {
  useEffect(() => {
    const element = ref.current;
    const listener = (event) => {
      //event
      if (!element && !handler) {
        return;
      }

      handler(event);
    };

    //listen to events
    element.addEventListener("mousedown", listener);
    element.addEventListener("touchstart", listener);
    element.addEventListener("pointerdown", listener);

    return () => {
      element.removeEventListener("mousedown", listener);
      element.removeEventListener("touchstart", listener);
      element.removeEventListener("pointerdown", listener);
    };
  }, [ref, handler]);
}
