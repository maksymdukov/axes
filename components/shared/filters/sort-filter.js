import React, { useState, useMemo } from 'react';
import { Select, makeStyles } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';

const useStyles = makeStyles({
  outlined: {
    paddingTop: 10,
    paddingBottom: 10
  }
});

export const sortOptions = (t) => [
  { label: 'Новинки', value: 'createdAt.desc' },
  { label: 'От дешевых к дорогим', value: 'price.asc' },
  { label: 'От дорогих к дешевым', value: 'price.desc' }
];

const SortFilter = ({ defaultOption, onChange, getOptions }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const options = useMemo(
    () => (getOptions && getOptions(t)) || sortOptions(t),
    [t, getOptions]
  );

  const [filter, setFilter] = useState(
    (defaultOption && options[defaultOption]) || options[0]
  );

  const handleChange = (e) => {
    setFilter(e.target.value);
    onChange && onChange(e.target.value.split('.'));
  };
  return (
    <Select
      classes={{
        outlined: classes.outlined
      }}
      native
      value={filter.value}
      onChange={handleChange}
      variant="outlined"
    >
      {options.map(({ label, value }) => (
        <option key={label} value={value}>
          {label}
        </option>
      ))}
    </Select>
  );
};

export default SortFilter;
