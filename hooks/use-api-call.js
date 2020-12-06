import { useCallback, useEffect, useState } from 'react';

export const useApiCall = ({ fetcher, args, data }) => {
  const [state, setState] = useState({
    data,
    loading: false,
    error: null
  });
  const doRequest = useCallback(
    async (requestArgs) => {
      setState(
        (prevState) => ({
          ...prevState,
          loading: true,
          error: null
        }),
        [setState]
      );

      try {
        const data = await fetcher({ ...args, ...requestArgs });
        setState((prevState) => ({
          ...prevState,
          data,
          loading: false
        }));
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          error: 'An error occured'
        }));
        throw error;
      }
    },
    [fetcher, setState, args]
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

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    doRequest
  };
};
