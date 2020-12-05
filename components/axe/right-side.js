import React from 'react';
import Surface from './surface/surface';
import useTranslation from 'next-translate/useTranslation';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@Components/shared/link/link';
import LabelledIcon from './elements/labelled-icon';
import { useRichTextStyles } from '@Components/shared/richtext-page/styles';

const useStyles = makeStyles(({ spacing, palette }) => ({
  deliveryLink: {
    display: 'block',
    color: palette.primary.light,
    marginTop: spacing(2)
  }
}));

const RightSide = ({ axe }) => {
  const classes = useStyles();
  const richClasses = useRichTextStyles();
  const { t } = useTranslation();
  return (
    <>
      <Surface header={t('axe:descrHeader')}>
        <div
          className={richClasses.block}
          dangerouslySetInnerHTML={{ __html: axe.longDescription }}
        />
        <div>
          <Link href="/sovety">{t('common:nav.sovety')} &#8594;</Link>
        </div>
      </Surface>
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
