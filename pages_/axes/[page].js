import React from "react";
import Layout from "../../components/layout/layout";
import PageLayout from "../../components/layout/page-layout";
import Cards from "../../components/shared/card/cards";
import axesJson from "../../_data/axes";
import Pagination from "../../components/axes/pagination/pagination";
import WithBreadcrumbs from "../../components/shared/with-breadcrumbs/with-breadcrumbs";

const breadcrumbs = [{ href: "/axes", label: "common:nav.axes" }];

export const AxesPage = ({ axes, page, pageCount }) => {
  return (
    <Layout>
      <PageLayout>
        <WithBreadcrumbs paths={breadcrumbs}>
          <Cards cards={axes} />
          <Pagination page={Number(page)} pageCount={Number(pageCount)} />
        </WithBreadcrumbs>
      </PageLayout>
    </Layout>
  );
};

const timeout = (t = 1000) =>
  new Promise(resolve => {
    setTimeout(resolve, t);
  });

export const fetchAxes = async page => {
  await timeout(20);
  return axesJson.slice((Number(page) - 1) * 10, 10 * Number(page));
};

export async function getStaticProps({ params }) {
  const data = await fetchAxes(params.page);
  return {
    props: { axes: data, page: params.page, pageCount: 2 }
  };
}

export async function getStaticPaths(ctx) {
  return {
    paths: [{ params: { page: "1" } }, { params: { page: "2" } }],
    fallback: false
  };
}

export default AxesPage;
