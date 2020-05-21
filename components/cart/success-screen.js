import React from 'react';
import CenteredBox from '../shared/box/centered-box';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useTranslation } from 'next-translate';

const useStyles = makeStyles(({ spacing }) => ({
  alertIcon: {
    marginRight: spacing()
  },
  wrapper: {
    textAlign: 'center'
  }
}));

const SuccessScreen = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <CenteredBox
      minWidth={200}
      minHeight={200}
      color="success.main"
      fontSize="1.4rem"
    >
      <div className={classes.wrapper}>
        <CenteredBox>
          <CheckCircleOutlineIcon
            className={classes.alertIcon}
            color="inherit"
            fontSize="large"
          />
          {t('common:checkout.success1')}
        </CenteredBox>
        <div>{t('common:checkout.success2')}</div>
      </div>
    </CenteredBox>
  );
};

export default SuccessScreen;
