import { useEffect } from "react";

import useTimeout from "src/hooks/useTimeout";

export function useDebounce(callback: any, delay: any, dependencies: any) {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(clear, []);
}
