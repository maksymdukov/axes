import React from "react";
import { Box } from "@material-ui/core";

const CenteredBox = ({ children, ...rest }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" {...rest}>
      {children}
    </Box>
  );
};

export default CenteredBox;
