import React from 'react';
import Layout from '../../components/layout/layout';
import PageLayout from '../../components/layout/page-layout';
import Cards from '../../components/shared/card/cards';
import Pagination from '../../components/axes/pagination/pagination';
import WithBreadcrumbs from '../../components/shared/with-breadcrumbs/with-breadcrumbs';
import { getAxes } from '../../actions/axe';
import Head from '../../components/shared/head/head';
import { useTranslation } from 'next-translate';

const breadcrumbs = [{ href: '/axes', label: 'common:nav.axes' }];

export const AxesPage = ({ axes, page, pageCount }) => {
  const { t } = useTranslation();
  const title =
    page !== 1 && `${t('axes:seo.title')} ${t('axes:seo.page')} ${page}`;
  return (
    <Layout>
      <Head i18Page="axes" title={title} />
      <PageLayout>
        <WithBreadcrumbs paths={breadcrumbs}>
          <Cards cards={axes} />
          <Pagination page={Number(page)} pageCount={Number(pageCount)} />
        </WithBreadcrumbs>
      </PageLayout>
    </Layout>
  );
};

export async function getStaticProps({ lang, params }) {
  const { data, pageCount } = await getAxes(lang, params.page);
  return {
    props: { axes: data, page: params.page, pageCount }
  };
}

export async function getStaticPaths({ lang }) {
  const { pageCount } = await getAxes(lang, 1);
  const paths = Array.from({ length: pageCount }).map((_, idx) => ({
    params: { page: String(idx + 1) }
  }));
  return {
    paths,
    fallback: false
  };
}

export default AxesPage;
