import React from 'react';
import { Container } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import MainHeader from '@Components/shared/typography/main-header';
import Cards from '@Components/shared/card/cards';
import { useMainContainerStyles } from './styles';

const BestWorks = ({ featuredAxes }) => {
  const classes = useMainContainerStyles();
  const { t } = useTranslation();
  return (
    <section className={classes.mainContainer}>
      <Container maxWidth="xl">
        <MainHeader>{t('index:bestWorks')}</MainHeader>
        <Cards cards={featuredAxes} className={classes.mb} />
      </Container>
    </section>
  );
};

export default BestWorks;
