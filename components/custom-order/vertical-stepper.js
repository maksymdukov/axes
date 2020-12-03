import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import { StepConnector } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import StepperActions from './stepper-actions';
import { getStepContent, getSteps } from './stepper-helpers';

const useStyles = makeStyles(({ palette, spacing, breakpoints }) => ({
  root: {
    width: '100%',
    margin: 'auto',
    maxWidth: 700,
    color: palette.secondary.main
  },
  paper: {
    [breakpoints.down('xs')]: {
      padding: spacing()
    }
  },
  resetContainer: {
    padding: spacing(3)
  },
  stepIcon: {
    fontSize: 45,
    '&.MuiStepIcon-active, &.MuiStepIcon-completed': {
      color: palette.secondary.main
    }
  },
  stepContent: {
    marginLeft: 23
  },
  connector: {
    marginLeft: 23
  }
}));

const VerticalStepper = ({
  submitForm,
  activeStep,
  setActiveStep,
  isSubmitting
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const steps = getSteps(t);
  const isLastStep = activeStep === steps.length - 2;
  const isFirstStep = activeStep === 0;
  const isComplete = activeStep > steps.length - 2;

  const handleNext = () => {
    if (activeStep < steps.length - 2) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      submitForm();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Stepper
        elevation={10}
        classes={{ root: classes.paper }}
        activeStep={activeStep}
        orientation="vertical"
        connector={<StepConnector className={classes.connector} />}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                classes: {
                  root: classes.stepIcon,
                  active: classes.activeStepIcon
                }
              }}
            >
              {label}
            </StepLabel>
            <StepContent
              className={classes.stepContent}
              TransitionProps={{ unmountOnExit: false }}
            >
              {getStepContent(index)}
              <StepperActions
                isSubmitting={isSubmitting}
                isLastStep={isLastStep}
                isFirstStep={isFirstStep}
                isComplete={isComplete}
                handleBack={handleBack}
                handleNext={handleNext}
                t={t}
              />
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {/*{activeStep === steps.length && (*/}
      {/*  <Paper square elevation={0} className={classes.resetContainer}>*/}
      {/*    <Typography>Заказ отправлен</Typography>*/}
      {/*  </Paper>*/}
      {/*)}*/}
    </div>
  );
};

export default VerticalStepper;
