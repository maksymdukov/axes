import React from 'react';
import NumberIcon from './number';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  itemWrapper: {
    margin: '.7rem 0'
  }
}));

const InstructionItem = ({ number, label }) => {
  const classes = useStyles();
  return (
    <div className={classes.itemWrapper}>
      <NumberIcon number={number} />
      <span>{label}</span>
    </div>
  );
};

export default InstructionItem;
