import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "../shared/link/link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette }) => ({
  footerLink: {
    display: "block",
    color: palette.grey[300],
    fontSize: "small",
    marginBottom: "0.2rem"
  }
}));

const Block = ({ header, links, children }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={3}>
      {children || (
        <div>
          <Typography variant="subtitle2" gutterBottom>
            {header}
          </Typography>
          {links.map(link => (
            <Link
              className={classes.footerLink}
              key={link.href}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </Grid>
  );
};

export default Block;
