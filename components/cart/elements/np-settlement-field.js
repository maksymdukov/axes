import React, { useCallback } from 'react';
import AsyncAutocompleteField from '@Components/shared/inputs/async-autocomplete-field';
import { useRouter } from 'next/router';
import { findSettlements } from '~/apis/novaposhta';
import { formatSettlementFields } from '~/apis/novaposhta.utils';

const NpSettlementField = ({ ...props }) => {
  const { locale } = useRouter();

  const getOptionLabel = (option) => {
    if (!option) {
      return '';
    }
    return option.FullDescription;
  };

  const getOptionSelected = (option, value) => option.Ref === value.Ref;

  const formatBeforeRequest = useCallback((input) => input.split(' - ')[0], []);

  const fetcher = async ({
    abortController,
    prevAbortController,
    inputValue
  }) => {
    prevAbortController?.abort();
    const results = await findSettlements({
      locale,
      query: inputValue,
      signal: abortController.signal
    });
    return formatSettlementFields(results, locale);
  };

  return (
    <AsyncAutocompleteField
      getOptionLabel={getOptionLabel}
      getOptionSelected={getOptionSelected}
      formatBeforeRequest={formatBeforeRequest}
      fetcher={fetcher}
      {...props}
    />
  );
};

export default NpSettlementField;
