import React, { useCallback, useMemo } from 'react';
import AsyncAutocompleteField from '@Components/shared/inputs/async-autocomplete-field';
import { useRouter } from 'next/router';
import { findSettlements } from '~/apis/novaposhta';

const NpSettlementField = ({ ...props }) => {
  const { locale } = useRouter();
  const fieldNames = useMemo(
    () =>
      locale === 'ru'
        ? {
            description: 'DescriptionRu',
            region: 'RegionsDescriptionRu',
            area: 'AreaDescriptionRu'
          }
        : {
            description: 'Description',
            region: 'RegionsDescription',
            area: 'AreaDescription'
          },
    [locale]
  );

  const getOptionLabel = (option) => {
    if (!option) {
      return '';
    }
    const description = option[fieldNames.description];
    const region = option[fieldNames.region]
      ? ` - ${option[fieldNames.region]}`
      : '';
    const area = option[fieldNames.area] ? ` - ${option[fieldNames.area]}` : '';
    return `${description}${region}${area}`;
  };

  const getOptionSelected = (option, value) => option.Ref === value.Ref;

  const formatBeforeRequest = useCallback((input) => input.split(' - ')[0], []);

  const fetcher = async ({
    abortController,
    prevAbortController,
    inputValue
  }) => {
    prevAbortController?.abort();
    return findSettlements({
      locale,
      query: inputValue,
      signal: abortController.signal
    });
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
