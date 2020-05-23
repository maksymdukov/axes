import { useRef, useEffect } from 'react';

export const usePreviousValue = (value) => {
  const prevValue = useRef();
  useEffect(() => {
    prevValue.current = value;
  }, [value]);
  return prevValue.current;
};
