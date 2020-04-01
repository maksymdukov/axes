import React from "react";
import MaskedInput from "react-text-mask";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "+",
        "3",
        "8",
        "(",
        /[0-9]/,
        /\d/,
        /\d/,
        ")",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/
      ]}
      placeholderChar={"\u2000"}
      // showMask
      guide
    />
  );
}

export default function PhoneInput({
  field: { name, value, onChange, onBlur },
  form: { touched, errors, isSubmitting },
  label,
  placeholder
}) {
  return (
    <FormControl fullWidth error={touched[name] && !!errors[name]}>
      <InputLabel htmlFor="formatted-text-mask-input">{label}</InputLabel>
      <Input
        disabled={isSubmitting}
        fullWidth
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        id="formatted-text-mask-input"
        inputComponent={TextMaskCustom}
        placeholder={placeholder}
      />
      {touched[name] && errors[name] && (
        <FormHelperText>{errors[name]}</FormHelperText>
      )}
    </FormControl>
  );
}
