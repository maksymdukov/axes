import React, { useMemo } from 'react';
import Layout from '../../components/layout/layout';
import PageLayout from '../../components/layout/page-layout';
import Cards from '../../components/shared/card/cards';
import Pagination from '../../components/axes/pagination/pagination';
import WithBreadcrumbs from '../../components/shared/with-breadcrumbs/with-breadcrumbs';
import { getNumberOfAxesPages, getAxes } from '~/apis/axe';
import Head from '../../components/shared/head/head';
import useTranslation from 'next-translate/useTranslation';
import Sort from '@Components/axes/filters/sort';
import { useApiCall } from '~/hooks/use-api-call';
import MainHeader from '@Components/shared/typography/main-header';
import { config } from '~/config/config';
import { useRouter } from 'next/router';
import ErrorAlert from '@Components/shared/alerts/alerts';

const breadcrumbs = [{ href: '/axes', label: 'common:nav.axes' }];

export const AxesPage = ({ items, page, size, total }) => {
  const { t, lang } = useTranslation();

  const { asPath } = useRouter();

  const memoizedData = useMemo(() => ({ items, page, size, total }), [
    items,
    page,
    size,
    total
  ]);

  const { data, doRequest, error, loading } = useApiCall({
    fetcher: getAxes,
    args: { page, size, lang },
    data: memoizedData
  });

  // TODO query changing in browser

  const title =
    page !== 1 && `${t('axes:seo.title')} - ${t('axes:seo.page')} ${page}`;
  return (
    <Layout>
      <Head i18Page="axes" title={title}>
        <link rel="canonical" href={`${config.PUBLIC_URL}${asPath}`} />
      </Head>
      <PageLayout>
        <WithBreadcrumbs paths={breadcrumbs}>
          <MainHeader component="h1">{t('axes:header')}</MainHeader>
          {error && <ErrorAlert />}
          <Sort doRequest={doRequest} />
          <Cards cards={data.items} loading={loading} />
          <Pagination page={page} size={size} total={total} />
        </WithBreadcrumbs>
      </PageLayout>
    </Layout>
  );
};

export async function getStaticProps({ locale, params }) {
  const { items, total, size, page } = await getAxes({
    lang: locale,
    page: params.page
  });
  return {
    props: {
      items,
      total,
      size,
      page
    }
  };
}

export async function getStaticPaths({ locales }) {
  const number = await getNumberOfAxesPages();
  let paths = [];
  locales.forEach((locale) => {
    paths = paths.concat(
      Array.from({ length: number })
        .map((_, idx) => ({
          params: { page: String(idx + 1) },
          locale
        }))
        .shift()
    );
    // Remove first page. it's already rendered as index.js
  });
  return {
    paths,
    fallback: false
  };
}

export default AxesPage;
