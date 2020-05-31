import React from 'react';
import Surface from './surface/surface';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'next-translate';
import { makeStyles } from '@material-ui/core/styles';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { richtextDocumentOptions } from '../shared/richtext-page/options';
import Link from '@Components/shared/link/link';
import LabelledIcon from './elements/labelled-icon';

const useStyles = makeStyles(({ spacing, palette }) => ({
  deliveryLink: {
    display: 'block',
    color: palette.primary.light,
    marginTop: spacing(2)
  }
}));

const RightSide = ({ axe }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const richTextDocument = documentToReactComponents(
    axe.longDescription,
    richtextDocumentOptions
  );
  return (
    <>
      <Surface header={t('axe:descrHeader')}>{richTextDocument}</Surface>
      {axe.characteristics && (
        <Surface header={t('axe:specHeader')}>
          <Typography component="div">
            {/* <ReactMarkdown source={axe.characteristics} /> */}
          </Typography>
        </Surface>
      )}
      <Surface header={t('axe:deliveryHeader')}>
        <LabelledIcon
          alt="Nova poshta"
          src="/assets/svg/nova-poshta.svg"
          label={t('axe:novaPoshta')}
        />
        <LabelledIcon
          alt="Ukr poshta"
          src="/assets/svg/ukr-poshta.svg"
          label={t('axe:ukrPoshta')}
        />
        <Link href="/delivery" className={classes.deliveryLink}>
          {t('axe:deliveryMore')} &#8594;
        </Link>
      </Surface>
      <Surface header={t('axe:paymentMethodHeader')}>
        <LabelledIcon
          alt="Money"
          src="/assets/svg/money.svg"
          label={t('axe:platesh')}
        />
        <LabelledIcon
          alt="PrivatBank"
          src="/assets/images/privatbank.png"
          label={t('axe:privat')}
        />
      </Surface>
    </>
  );
};

export default RightSide;
