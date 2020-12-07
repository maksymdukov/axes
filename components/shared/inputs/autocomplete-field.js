import React from 'react';
import GenericAutocompleteField from './generic-autocomplete-field';

const AutocompleteField = (props) => {
  const [inputValue, setInputValue] = React.useState('');

  return (
    <GenericAutocompleteField
      inputValue={inputValue}
      setInputValue={setInputValue}
      {...props}
    />
  );
};

export default AutocompleteField;
