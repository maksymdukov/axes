import React from 'react';
import Layout from '../../components/layout/layout';
import PageLayout from '../../components/layout/page-layout';
import Cards from '../../components/shared/card/cards';
import Pagination from '../../components/axes/pagination/pagination';
import WithBreadcrumbs from '../../components/shared/with-breadcrumbs/with-breadcrumbs';
import { getAxes } from '../../actions/axe';
import Head from '../../components/shared/head/head';
import { useTranslation } from 'next-translate';
import { numberOfPages } from '~/actions/axe.utils';

const breadcrumbs = [{ href: '/axes', label: 'common:nav.axes' }];

export const AxesPage = ({ items: axes, page, size, total }) => {
  const { t } = useTranslation();
  const title =
    page !== 1 && `${t('axes:seo.title')} ${t('axes:seo.page')} ${page}`;
  return (
    <Layout>
      <Head i18Page="axes" title={title} />
      <PageLayout>
        <WithBreadcrumbs paths={breadcrumbs}>
          <Cards cards={axes} />
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

export async function getStaticPaths({ lang }) {
  const { total, size } = await getAxes({ lang });
  const paths = Array.from({ length: numberOfPages({ total, size }) }).map(
    (_, idx) => ({
      params: { page: String(idx + 1) }
    })
  );
  return {
    paths,
    fallback: false
  };
}

export default AxesPage;
