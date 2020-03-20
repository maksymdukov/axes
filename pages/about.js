import React from "react";
import Container from "@material-ui/core/Container";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation("common");
  console.log(t("test"));
  return <Container>Про нас</Container>;
};

About.getInitialProps = async ctx => {
  return {
    namespacesRequired: ["common"]
  };
};

About.getInitialProps = async () => {
  return {
    namespacesRequired: ["about"]
  };
};

export default About;
