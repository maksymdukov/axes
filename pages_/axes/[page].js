import React, { useCallback } from 'react';
import Layout from '../../components/layout/layout';
import PageLayout from '../../components/layout/page-layout';
import Cards from '../../components/shared/card/cards';
import Pagination from '../../components/axes/pagination/pagination';
import WithBreadcrumbs from '../../components/shared/with-breadcrumbs/with-breadcrumbs';
import { getNumberOfAxesPages, getAxes } from '../../api/server/axe';
import Head from '../../components/shared/head/head';
import { useTranslation } from 'next-translate';
import Sort from '@Components/axes/filters/sort';
import { getAxesApi } from '~/api/client/get-axes';
import { useApiCall } from '~/hooks/use-api-call';
import MainHeader from '@Components/shared/typography/main-header';

const breadcrumbs = [{ href: '/axes', label: 'common:nav.axes' }];

export const AxesPage = ({ items, page, size, total }) => {
  const { t, lang } = useTranslation();
  const { data, doRequest, error, loading } = useApiCall({
    fetcher: getAxesApi,
    args: { page, size, lang },
    data: { items, page, size, total }
  });

  const handleSortChange = useCallback(
    ([sort, order]) => {
      doRequest({ sort, order });
    },
    [doRequest]
  );

  // TODO error handling and query changing in browser
  // canonical tag

  const title =
    page !== 1 && `${t('axes:seo.title')} - ${t('axes:seo.page')} ${page}`;
  return (
    <Layout>
      <Head i18Page="axes" title={title} />
      <PageLayout>
        <WithBreadcrumbs paths={breadcrumbs}>
          <MainHeader component="h1">{t('axes:header')}</MainHeader>
          <Sort onSortChange={handleSortChange} />
          <Cards cards={data.items} loading={loading} />
          <Pagination page={page} size={size} total={total} />
        </WithBreadcrumbs>
      </PageLayout>
    </Layout>
  );
};

export async function getStaticProps({ lang, params }) {
  const { items, total, size, page } = await getAxes({
    lang,
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

export async function getStaticPaths() {
  const number = await getNumberOfAxesPages();
  const paths = Array.from({ length: number }).map((_, idx) => ({
    params: { page: String(idx + 1) }
  }));
  // Remove first page. it's already rendered as index.js
  paths.shift();
  return {
    paths,
    fallback: false
  };
}

export default AxesPage;
