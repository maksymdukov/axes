import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(({ spacing }) => ({
  button: {
    marginRight: spacing(1)
  },
  actionsContainer: {
    marginBottom: spacing(2)
  },
  nextWrapper: {
    display: "inline-block",
    position: "relative"
  },
  spinnerWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
}));

const StepperActions = ({
  isSubmitting,
  isComplete,
  isLastStep,
  isFirstStep,
  handleBack,
  handleNext,
  t
}) => {
  const classes = useStyles();
  if (isComplete) return null;
  return (
    <div className={classes.actionsContainer}>
      <div>
        <Button
          disabled={isFirstStep || isSubmitting}
          onClick={handleBack}
          className={classes.button}
          size="small"
        >
          {t("custom-order:backBtn")}
        </Button>
        <div className={classes.nextWrapper}>
          <Button
            disabled={isSubmitting}
            size={isLastStep ? "large" : "small"}
            variant="contained"
            color={isLastStep ? "secondary" : "primary"}
            onClick={handleNext}
          >
            {isLastStep ? t("custom-order:sendBtn") : t("custom-order:nextBtn")}
          </Button>
          {isSubmitting && (
            <div className={classes.spinnerWrapper}>
              <CircularProgress size={30} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepperActions;
