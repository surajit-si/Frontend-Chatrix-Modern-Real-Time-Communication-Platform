import { useEffect } from "react";

export default function useOnClickElement(el, handler) {
  useEffect(() => {
    const element = el.current;
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
  }, [el, handler]);
}
