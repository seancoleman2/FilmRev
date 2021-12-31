import { createMuiTheme } from "@material-ui/core";

const darkBlue = "#222C35";
const orange = "#FF5B50";
const lightBlue = "#4AB9BD";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange,
    },
    secondary: {
      main: lightBlue,
    },
    type: "dark",
  },
  typography: {
    fontFamily: ["Segoe UI", "Open Sans", "Roboto", "Arial", "sans-serif"].join(
      ","
    ),
    h1: {
      fontWeight: 800,
      color: "#FFFFFF",
    },
    h2: {
      color: "#FFFFFF",
    },
    h3: {
      color: "#FFFFFF",
    },
    h4: {
      color: "#FFFFFF",
    },
    h5: {
      color: "#000000",
    },
    h6: {
      color: "#FFFFFF",
    },
    spacing: 2,
  },
});

export default theme;
