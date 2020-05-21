import React from 'react';
import Typography from '@material-ui/core/Typography';

const Slogan = ({ label, className }) => {
  return (
    <Typography variant="h5" className={className}>
      {label}
    </Typography>
  );
};

export default Slogan;
