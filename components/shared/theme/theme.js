import { createMuiTheme, fade } from "@material-ui/core/styles";
import { red, blueGrey, green } from "@material-ui/core/colors";

const palette = {
  primary: {
    main: blueGrey["900"]
  },
  secondary: {
    main: "#19857b"
  },
  tertiary: {
    main: "#3f669f",
    dark: "#2b4b79"
  },
  error: {
    main: red.A400
  },
  background: {
    default: "#fff"
  },
  success: {
    main: green.A700,
    contrastText: "#fff"
  }
};

// Create a theme instance.
const theme = createMuiTheme({
  palette,
  customShadows: [
    `0px 7px 8px -4px ${fade(
      palette.secondary.main,
      0.1
    )},0px 9px 12px 1px ${fade(
      palette.secondary.main,
      0.1
    )},0px 3px 16px 2px ${fade(palette.secondary.main, 0.08)}`
  ]
});

export default theme;
