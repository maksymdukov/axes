import React from "react";
import Layout from "../../components/layout/layout";
import PageLayout from "../../components/layout/page-layout";
import { useRouter } from "next/router";
import axesJson from "../../_data/axes";
import Typography from "@material-ui/core/Typography";
import Surface from "../../components/axe/surface/surface";
import { useTranslation } from "next-translate";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CtaButton from "../../components/shared/buttons/cta-button";
import Box from "@material-ui/core/Box";
import Gallery from "../../components/axe/gallery/gallery";
import WithBreadcrumbs from "../../components/shared/with-breadcrumbs/with-breadcrumbs";
import CartQuantity from "../../components/shared/cart-quantity/cart-quantity";
import TableCell from "@material-ui/core/TableCell";
import { useCart } from "../../context/cart/hooks";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(({ spacing }) => ({
  swiper: {
    maxWidth: 800,
    border: "1px solid #ddd",
    margin: "1rem 0"
  },
  leftSection: {
    position: "sticky",
    top: 0
  },
  rightSection: {
    paddingLeft: spacing(2),
    paddingTop: 57
  }
}));

const Axe = ({ axe }) => {
  const classes = useStyles();
  const router = useRouter();
  const { t } = useTranslation();
  const {
    cart,
    deleteItem,
    addItem,
    decreaseItem,
    isInCart,
    getItemCount
  } = useCart();
  const inCart = isInCart(axe.id);
  const count = getItemCount(axe.id);
  const breadcrumbs = [
    { href: "/axes", label: "common:nav.axes" },
    { pureLabel: axe.title }
  ];
  console.log("axeId", router.query);
  console.log(axe);
  return (
    <Layout>
      <PageLayout>
        <WithBreadcrumbs paths={breadcrumbs}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <section className={classes.leftSection}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {axe.title}
                </Typography>
                <Gallery axe={axe} />
                <Box display="flex" justifyContent="flex-end">
                  {inCart && (
                    <>
                      <CartQuantity
                        onIncrease={() => addItem(axe)}
                        onDecrease={() => decreaseItem(axe.id)}
                        decreaseDisabled={count === 1}
                        display="inline-flex"
                      >
                        {count}
                      </CartQuantity>
                      <Button
                        size="large"
                        variant="contained"
                        color="default"
                        onClick={() => deleteItem(axe.id)}
                      >
                        {t("axe:unorder")}
                      </Button>
                    </>
                  )}
                  {!inCart && (
                    <CtaButton
                      align="end"
                      size="large"
                      onClick={() => addItem(axe)}
                    >
                      {t("axe:order")}
                    </CtaButton>
                  )}
                </Box>
              </section>
            </Grid>
            <Grid item xs={12} md={6} className={classes.rightSection}>
              <Surface header={t("axe:descrHeader")}>
                <Typography>{axe.description}</Typography>
              </Surface>
              <Surface header={t("axe:specHeader")}>
                <p>Blab</p>
                <p>Blab</p>
                <p>Blab</p>
              </Surface>
            </Grid>
          </Grid>
        </WithBreadcrumbs>
      </PageLayout>
    </Layout>
  );
};

const timeout = (t = 1000) =>
  new Promise(resolve => {
    setTimeout(resolve, t);
  });

const fetchData = async id => {
  await timeout(10);
  return axesJson.find(axe => axe.id === id);
};

export async function getStaticProps({ params }) {
  console.log("getProps", params.axeId);
  const data = await fetchData(params.axeId);
  return {
    props: { axe: data }
  };
}

export async function getStaticPaths(ctx) {
  console.log("getStaticPath", ctx);
  const paths = Array.from({ length: 16 }).map((_, idx) => ({
    params: { axeId: String(idx + 1) }
  }));
  return {
    paths,
    fallback: false
  };
}

export default Axe;
