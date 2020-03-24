import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { useTranslation } from "next-translate";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import FlagRUIcon from "../../shared/icons/flag-ru";
import FlagUAIcon from "../../shared/icons/flag-ua";
import LanguageMenuItem from "./language-menu-item";
import Router from "next-translate/Router";

const useStyles = makeStyles(() => ({
  langSelect: {
    color: "inherit",
    "&::before": {
      display: "none"
    },
    "&::after": {
      display: "none"
    }
  },
  muiIcon: {
    color: "inherit"
  }
}));

const LANGUAGES = [
  { icon: FlagUAIcon, lang: "ua" },
  { icon: FlagRUIcon, lang: "ru" }
];

export default function LanguageToggler({ className }) {
  const classes = useStyles();
  const { lang } = useTranslation();
  const handleLanguageChange = ({ target: { value } }) => {
    localStorage.setItem("language", value);
    let url = "/";
    const slugs = window.location.pathname.split("/");
    if (slugs[1] === "ua" || slugs[1] === "ru") {
      url = slugs.slice(2).join("/") || "/";
    }
    Router.pushI18n({ url, options: { lang: value } });
  };

  return (
    <div className={className}>
      <Select
        className={classes.langSelect}
        classes={{ icon: classes.muiIcon }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={lang}
        onChange={handleLanguageChange}
      >
        {LANGUAGES.map(lang => (
          <MenuItem value={lang.lang} key={lang.lang}>
            <LanguageMenuItem {...lang} />
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
