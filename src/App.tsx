import React from "react";
import AppLogo from "./icons/app_icon.png";
import { makeStyles, ThemeProvider, Box } from "@material-ui/core";
import theme from "./theme";
import FilmReviewSession from "./components/FilmReviewSession";

const useStyles = makeStyles({
  app: {
    background: "#47515B",
    height: "100%",
  },
  header: {
    padding: "5px 15px 5px",
  },
});

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <header className={classes.header}>
        <img src={AppLogo} className="app-icon" />
      </header>
      <ThemeProvider theme={theme}>
        <FilmReviewSession />
      </ThemeProvider>
    </div>
  );
}
