import React, { useState } from 'react';
import MainHeader from '../shared/typography/main-header';
import Grid from '@material-ui/core/Grid';
import CenteredBox from '../shared/box/centered-box';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import InstructionItem from './instruction-item';
import PawIcon from '../shared/icons/bear.svg';
import AxeIcon from '../shared/icons/axe2.svg';
import FormIcon from '../shared/icons/form.svg';
import CtaButton from '../shared/buttons/cta-button';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import VisibilitySensor from 'react-visibility-sensor';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import { default as NextLink } from 'next/link';

const useStyles = makeStyles(({ palette, breakpoints, spacing }) => ({
  sectionWrapper: {
    [breakpoints.down('sm')]: {
      flexDirection: 'column-reverse'
    }
  },
  individualText: {
    height: '100%'
  },
  individualWrapper: {
    [breakpoints.up('md')]: {
      paddingLeft: spacing(4)
    },
    marginBottom: spacing(4)
  },
  individualIcon: {
    width: '100%',
    height: '100%',
    maxWidth: 300,
    boxShadow: `2px 1px 20px 5px ${palette.tertiary.dark}`,
    background: palette.tertiary.dark
  },
  instructionWrapper: {
    [breakpoints.up('md')]: {
      paddingRight: spacing(4)
    }
  },
  instructions: {
    '& > *:nth-child(2n)': {
      marginLeft: 40,
      [breakpoints.only('xs')]: {
        marginLeft: 5
      }
    }
  },
  imprint: {
    fill: 'white',
    width: 100,
    height: 100
  },
  animateImprint: {
    animation: '1s linear $glow'
  },
  axeIcon: {
    position: 'absolute',
    width: 100,
    height: 100
  },
  formIcon: {
    width: 100,
    height: 100,
    fill: 'white'
  },
  animateFormIcon: {
    animation: '1s linear 2s $glow'
  },
  imprintMerged: {
    fill: 'white',
    position: 'absolute',
    top: 0,
    left: 180,
    width: 100,
    height: 100
  },
  animateMerge: {
    animation: '1s ease-in 4s $merge forwards'
  },
  merge: {
    position: 'relative',
    height: 140
  },
  '@keyframes glow': {
    '50%': {
      fill: palette.secondary.light,
      transform: 'scale(1.4)'
    },
    '100%': {
      fill: 'white'
    }
  },
  '@keyframes merge': {
    to: {
      transform: 'translate(-205px, -16px) scale(0.3) rotate(-480deg)',
      fill: 'black'
    }
  }
}));

const Individual = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const onVisibilityChange = (isVisible) => {
    if (!visible && isVisible) {
      setVisible(true);
    }
  };
  return (
    <Container maxWidth="xl">
      <MainHeader>{t('index:instructions.header')}</MainHeader>
      <Grid container alignItems="center" className={classes.sectionWrapper}>
        <Grid md={6} xs={12} item>
          <CenteredBox
            justifyContent="flex-end"
            className={classes.instructionWrapper}
          >
            <VisibilitySensor onChange={onVisibilityChange}>
              <div className={classes.instructions}>
                <InstructionItem
                  number={1}
                  animate={visible}
                  delay={0}
                  label={t('index:instructions.step1')}
                />
                <PawIcon
                  className={clsx(
                    classes.imprint,
                    visible && classes.animateImprint
                  )}
                />
                <InstructionItem
                  number={2}
                  animate={visible}
                  delay={2}
                  label={t('index:instructions.step2')}
                />
                <FormIcon
                  className={clsx(
                    classes.formIcon,
                    visible && classes.animateFormIcon
                  )}
                />
                <InstructionItem
                  number={3}
                  animate={visible}
                  delay={4}
                  label={t('index:instructions.step3')}
                />
                <div className={classes.merge}>
                  <AxeIcon className={classes.axeIcon} />
                  <PawIcon
                    className={clsx(
                      classes.imprintMerged,
                      visible && classes.animateMerge
                    )}
                  />
                </div>
              </div>
            </VisibilitySensor>
          </CenteredBox>
        </Grid>
        <Grid item md={6} xs={12}>
          <CenteredBox
            justifyContent="flex-start"
            className={classes.individualWrapper}
          >
            <img
              alt="мастер"
              className={classes.individualIcon}
              src="/assets/svg/craftsman.svg"
            />
          </CenteredBox>
        </Grid>
      </Grid>
      <CenteredBox>
        <NextLink href="/custom-order" passHref>
          <CtaButton size="large" component="a">
            Перейти <ArrowRightAltIcon fontSize="large" />
          </CtaButton>
        </NextLink>
      </CenteredBox>
    </Container>
  );
};

export default Individual;
