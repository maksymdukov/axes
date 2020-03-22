import React from "react";
import Container from "@material-ui/core/Container";
import { useTranslation } from "next-translate";
import Layout from "../components/layout/layout";
import WithBreadcrumbs from "../components/shared/with-breadcrumbs/with-breadcrumbs";
import PageLayout from "../components/layout/page-layout";

const breadcrumbs = [{ href: "/about", label: "common:nav.about" }];

const About = () => {
  const { t } = useTranslation("common");
  console.log(t("test"));
  return (
    <Layout>
      <PageLayout>
        <WithBreadcrumbs paths={breadcrumbs}>Про нас</WithBreadcrumbs>
      </PageLayout>
    </Layout>
  );
};

export default About;
