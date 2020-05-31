import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ClockIcon from '../../public/assets/svg/clock.svg';
import InformationIcon from '../../public/assets/svg/info.svg';
import SketchIcon from '../../public/assets/svg/sketch.svg';
import InformationItem from './information-item';
import Link from '../shared/link/link';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    marginBottom: spacing(4)
  }
}));

const Information = ({ t }) => {
  const classes = useStyles();
  return (
    <Grid container color="primary.contrastText" className={classes.container}>
      <InformationItem
        Icon={InformationIcon}
        text={t('custom-order:info.info')}
      />
      <InformationItem Icon={SketchIcon} text={t('custom-order:info.sketch')} />
      <InformationItem
        Icon={ClockIcon}
        text={
          <>
            {t('custom-order:info.timing')}{' '}
            <Link href="/delivery">{t('custom-order:info.delivery')}</Link>
          </>
        }
      />
    </Grid>
  );
};

export default Information;
