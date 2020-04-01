import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ClockIcon from "../../public/assets/svg/clock.svg";
import InformationIcon from "../../public/assets/svg/info.svg";
import SketchIcon from "../../public/assets/svg/sketch.svg";
import InformationItem from "./information-item";

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    marginBottom: spacing(4)
  }
}));

const Information = () => {
  const classes = useStyles();
  return (
    <Grid container color="primary.contrastText" className={classes.container}>
      <InformationItem
        Icon={InformationIcon}
        text="Тут нужно что-то написать общеинформационное. Про индивидуальный
            заказ"
      />
      <InformationItem
        Icon={SketchIcon}
        text="Что-то про эскиз. Сначала мы делаем и согласовывем эскиз. Если он
            вам нравится - начинаем работу."
      />
      <InformationItem
        Icon={ClockIcon}
        text="Тут можно что-то написать про сроки. Срок исполнения заказ от 1 до 3
            недель"
      />
    </Grid>
  );
};

export default Information;
