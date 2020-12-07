import { CircularProgress, FormHelperText, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useTranslation } from 'next-translate';
import React from 'react';

const GenericAutocompleteField = ({
  loading,
  label,
  onOpen,
  setInputValue,
  field: { name },
  form: { setFieldValue, touched, errors, setFieldTouched },
  ...rest
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const onOpenHandler = () => {
    setOpen(true);
    onOpen && onOpen();
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (event, value) => {
    setFieldValue(name, value);
  };

  const handleOnBlur = () => {
    setFieldTouched(name, true);
  };

  const error = touched[name] && errors[name];

  return (
    <>
      <Autocomplete
        open={open}
        onOpen={onOpenHandler}
        onClose={onClose}
        onChange={onChange}
        onInputChange={(e, value) => setInputValue(value, true)}
        noOptionsText={t('common:checkout.noData')}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={!!error}
            onBlur={handleOnBlur}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              )
            }}
          />
        )}
        {...rest}
      />
      {error && <FormHelperText error>{errors[name]}</FormHelperText>}
    </>
  );
};

export default GenericAutocompleteField;
