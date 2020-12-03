import React from 'react';
import { Alert } from '@material-ui/lab';
import { Box } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';

const ErrorAlert = ({ text }) => {
  const { t } = useTranslation();
  const defaultText = t('common:errors.error');
  return (
    <Box my={1}>
      <Alert severity="error">{text ?? defaultText}</Alert>
    </Box>
  );
};

export default ErrorAlert;
