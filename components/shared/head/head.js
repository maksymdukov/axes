import React from 'react';
import NextHead from 'next/head';
import { getTitle } from '../../../utils/header';
import { useTranslation } from 'next-translate';
import { config } from '../../../config/config';

const Head = ({ i18Page, ogImage, ogImageSecure, title, description }) => {
  const { t } = useTranslation();
  const pageTitle = getTitle(title || t(`${i18Page}:seo.title`));
  const pageDescription = description || t(`${i18Page}:seo.description`);
  return (
    <NextHead>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta
        property="og:image"
        content={ogImage || `${config.PUBLIC_URL}/assets/images/axe-white.png`}
      />
      {ogImageSecure && (
        <meta property="og:image:secure_url" content={ogImageSecure} />
      )}
      {/* <meta property="og:url" /> */}
    </NextHead>
  );
};

export default Head;
