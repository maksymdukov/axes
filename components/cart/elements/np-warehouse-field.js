import React, { useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useApiCall } from '~/hooks/use-api-call';
import { findWarehouses } from '~/apis/novaposhta';
import { formatWarehouseFields } from '~/apis/novaposhta.utils';
import GenericAutocompleteField from '@Components/shared/inputs/generic-autocomplete-field';
import { usePreviousValue } from '~/hooks/common';

const NpWarehouseField = (props) => {
  const {
    form: { values, setFieldValue },
    field: { name }
  } = props;
  const [inputValue, setInputValue] = React.useState('');
  const initData = useMemo(() => [], []);
  const previousSettlement = usePreviousValue(values.npSettlement);
  const { locale } = useRouter();
  const getOptionLabel = (option) => (option ? option.FullDescription : '');

  const getOptionSelected = (option, value) => option.Ref === value.Ref;

  const fetcher = useCallback(async (arg) => {
    const warehouses = await findWarehouses(arg);
    return formatWarehouseFields(warehouses, locale);
  }, []);

  const { data, loading, doRequest, setFetchState } = useApiCall({
    fetcher,
    data: initData
  });

  useEffect(() => {
    setFieldValue(name, null);
    setInputValue('');
    setFetchState((prevState) => ({ ...prevState, data: initData }));
    if (
      values.npSettlement &&
      values.npSettlement.Ref &&
      previousSettlement !== values.npSettlement
    ) {
      doRequest({ locale, settlementRef: values.npSettlement.Ref });
    }
  }, [
    name,
    values.npSettlement,
    doRequest,
    locale,
    setFetchState,
    setFieldValue,
    initData
  ]);

  return (
    <GenericAutocompleteField
      disabled={loading || !data.length}
      getOptionLabel={getOptionLabel}
      getOptionSelected={getOptionSelected}
      options={data}
      inputValue={inputValue}
      setInputValue={setInputValue}
      openOnFocus
      {...props}
    />
  );
};

export default NpWarehouseField;
