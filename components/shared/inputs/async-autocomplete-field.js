import React, { useEffect, useMemo, useRef } from 'react';
import { useApiCall } from '~/hooks/use-api-call';
import GenericAutocompleteField from './generic-autocomplete-field';

const AsyncAutocompleteField = (props) => {
  const { formatBeforeRequest = (arg) => arg, fetcher, ...rest } = props;
  const {
    field: { value }
  } = props;
  const [inputValue, setInputValue] = React.useState('');
  const throttleTimeout = useRef(null);

  const initData = useMemo(() => [], []);

  const { data, doRequest, loading } = useApiCall({
    isAbortable: true,
    fetcher,
    data: initData
  });

  const onOpen = () => {
    const formattedInput = formatBeforeRequest(inputValue);
    doRequest({ inputValue: formattedInput });
  };

  useEffect(() => {
    if (inputValue) {
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }
      throttleTimeout.current = setTimeout(() => {
        const formattedInput = formatBeforeRequest(inputValue);
        doRequest({ inputValue: formattedInput });
      }, 300);
    }
    return () => {
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }
    };
  }, [inputValue, doRequest, formatBeforeRequest]);

  return (
    <GenericAutocompleteField
      loading={loading}
      value={value}
      onOpen={onOpen}
      inputValue={inputValue}
      filterOptions={(options) => options}
      setInputValue={setInputValue}
      options={data}
      {...rest}
    />
  );
};

export default AsyncAutocompleteField;
