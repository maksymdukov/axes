import FileUploader from './file-uploader';
import React from 'react';
import OrderForm from './order-form';

export const getSteps = (t) => {
  return [
    t('custom-order:step1.label'),
    t('custom-order:step2.label'),
    t('custom-order:step3.label')
  ];
};

export const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <FileUploader />;
    case 1:
      return <OrderForm />;
    default:
      return '';
  }
};
