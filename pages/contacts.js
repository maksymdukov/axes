import React from "react";
import PageLayout from "../components/layout/page-layout";
import Grid from "@material-ui/core/Grid";
import Profile from "../components/about/profile/profile";
import Box from "@material-ui/core/Box";

const Contacts = () => {
  return (
    <PageLayout>
      <Grid container>
        <Grid item sm={6} xs={12}>
          <Box display="flex" justifyContent="center">
            <Profile />
          </Box>
        </Grid>
        <Grid item sm={6} xs={12}></Grid>
      </Grid>
    </PageLayout>
  );
};

export default Contacts;
