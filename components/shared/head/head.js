import React from 'react';
import NextHead from 'next/head';
import { getTitle } from '../../../utils/header';
import { useTranslation } from 'next-translate';

const Head = ({
  i18Page,
  ogImage,
  ogImageSecureUrl,
  title,
  description,
  children
}) => {
  const { t /* lang: currentLang */ } = useTranslation();
  // const { path } = usePurePathname();
  // TODO Link ref="alternate" for languages

  const pageTitle = getTitle(title || t(`${i18Page}:seo.title`));
  const pageDescription = description || t(`${i18Page}:seo.description`);

  return (
    <NextHead>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:site_name" content="Sokyra.net.ua" />
      {ogImage && (
        <>
          <meta
            property="og:image"
            content={ogImage?.url || `/assets/images/axe-white.png`}
          />
          <meta property="og:image:width" content={ogImage?.width} />
          <meta property="og:image:height" content={ogImage?.height} />
          {ogImageSecureUrl && (
            <meta property="og:image:secure_url" content={ogImageSecureUrl} />
          )}
        </>
      )}
      <meta property="og:image" content="/assets/images/axe-white.png" />
      <meta property="og:image:width" content={512} />
      <meta property="og:image:height" content={512} />
      {children}
      {/* <meta property="og:url" /> */}
    </NextHead>
  );
};

export default Head;
