import { useCallback, useEffect, useRef, useState } from 'react';

export const useApiCall = ({ fetcher, args, data, isAbortable = false }) => {
  const mountedRef = useRef(true);
  const controllerRef = useRef(null);
  const [state, setState] = useState({
    data,
    loading: false,
    error: null
  });
  const doRequest = useCallback(
    async (requestArgs) => {
      let prevController;
      if (isAbortable) {
        prevController = controllerRef.current;
        controllerRef.current = new AbortController();
      }
      setState(
        (prevState) => ({
          ...prevState,
          loading: true,
          error: null
        }),
        [setState]
      );

      try {
        const data = await fetcher({
          ...args,
          ...requestArgs,
          abortController: controllerRef.current,
          prevAbortController: prevController
        });
        if (mountedRef.current) {
          setState((prevState) => ({
            ...prevState,
            data,
            loading: false
          }));
          controllerRef.current = null;
        }
      } catch (error) {
        if (mountedRef.current) {
          setState((prevState) => ({
            ...prevState,
            loading: false,
            error: 'An error occured'
          }));
          controllerRef.current = null;
          throw error;
        }
      }
    },
    [fetcher, setState, args, isAbortable]
  );

  useEffect(() => {
    if (state.data !== data) {
      // hook initial data has changed
      setState((prevState) => ({
        ...prevState,
        data: data
      }));
    }
  }, [data]);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    doRequest,
    setFetchState: setState
  };
};
