import React, { useCallback, useEffect, useMemo } from 'react';
import AutocompleteField from '@Components/shared/inputs/autocomplete-field';
import { useRouter } from 'next/router';
import { useApiCall } from '~/hooks/use-api-call';
import { findWarehouses } from '~/apis/novaposhta';

const NpWarehouseField = (props) => {
  const {
    form: { values, setFieldValue },
    field: { name }
  } = props;
  const initData = useMemo(() => [], []);
  const { locale } = useRouter();
  const fieldName = useMemo(
    () => (locale === 'ru' ? 'DescriptionRu' : 'Description'),
    [locale]
  );
  const getOptionLabel = (option) => (option ? option[fieldName] : '');

  const getOptionSelected = (option, value) => option.Ref === value.Ref;

  const fetcher = useCallback(async (arg) => findWarehouses(arg), []);

  const { data, loading, doRequest, setFetchState } = useApiCall({
    fetcher,
    data: initData
  });

  useEffect(() => {
    if (values.npSettlement && values.npSettlement.Ref) {
      doRequest({ locale, settlementRef: values.npSettlement.Ref });
    } else {
      setFieldValue(name, null);
      setFetchState((prevState) => ({ ...prevState, data: initData }));
    }
  }, [
    values.npSettlement,
    doRequest,
    locale,
    setFetchState,
    setFieldValue,
    initData
  ]);

  return (
    <AutocompleteField
      disabled={loading || !data.length}
      getOptionLabel={getOptionLabel}
      getOptionSelected={getOptionSelected}
      options={data}
      {...props}
    />
  );
};

export default NpWarehouseField;
