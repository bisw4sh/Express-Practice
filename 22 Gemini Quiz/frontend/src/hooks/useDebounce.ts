import { useState, useCallback } from "react";

type DebouncedFunction = (arg: string) => void;

const useDebounce = (
  cb: (arg: string) => void,
  delay: number,
): DebouncedFunction => {
  const [isReady, setIsReady] = useState(true);

  const debouncedFunction: DebouncedFunction = useCallback(
    (arg: string) => {
      if (!isReady) return;

      setIsReady(false);
      cb(arg);

      const handler = setTimeout(() => {
        setIsReady(true);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [cb, delay, isReady],
  );

  return debouncedFunction;
};

export default useDebounce;
