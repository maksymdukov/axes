import React from 'react';
import { Container } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import MainHeader from '@Components/shared/typography/main-header';
import Cards from '@Components/shared/card/cards';
import { useMainContainerStyles } from './styles';
import NextLink from 'next/link';
import CtaButton from '@Components/shared/buttons/cta-button';
import CenteredBox from '@Components/shared/box/centered-box';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

const NewWorks = ({ lastAxes }) => {
  const classes = useMainContainerStyles();
  const { t } = useTranslation();
  return (
    <section className={classes.mainContainer}>
      <Container maxWidth="xl">
        <MainHeader>{t('index:newWorks')}</MainHeader>
        <Cards cards={lastAxes.items} />
        <CenteredBox mt={2}>
          <NextLink href="/axes" passHref>
            <CtaButton size="large" component="a">
              {t('index:newWorkCta')} <ArrowRightAltIcon fontSize="large" />
            </CtaButton>
          </NextLink>
        </CenteredBox>
      </Container>
    </section>
  );
};

export default NewWorks;
