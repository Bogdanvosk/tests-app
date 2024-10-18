import { useEffect, useRef } from 'react';

const useOutsideClick = (ref, callback) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (event) => {
      const { current: target } = ref;

      if (target && !target.contains(event.target)) {
        callbackRef.current(event);
      }
    };

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [ref]);
};

export default useOutsideClick;
