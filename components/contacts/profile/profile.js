import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import useTranslation from 'next-translate/useTranslation';
import Contacts from './contacts';

const useStyles = makeStyles(({ spacing }) => ({
  profile: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  photo: {
    width: spacing(15),
    height: spacing(15),
    marginBottom: spacing()
  },
  name: {
    marginBottom: spacing(3)
  }
}));

const Profile = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <div className={classes.profile}>
      <Avatar
        alt="Kolya"
        src="/assets/images/master.jpg"
        className={classes.photo}
      />
      <Typography
        align="center"
        variant="h6"
        className={classes.name}
        color="textPrimary"
      >
        {t('contacts:masterName')}
      </Typography>
      <Contacts />
    </div>
  );
};

export default Profile;
