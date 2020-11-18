import React from 'react';
import AppLogo from './icons/app_icon.png';
import { makeStyles, ThemeProvider} from '@material-ui/core';
import theme from './theme';
import FilmReviewSession from './components/FilmReviewSession';


const useStyles = makeStyles({
  app: {
    background: '#222C35', 
    height: '100vh', 
    padding: '15px'
  }
})

export default function App() {
  const classes = useStyles(); 

  return (
    <div className={classes.app}>
      <header>
        <img src={AppLogo} className="app-icon"/>
      </header>
      <ThemeProvider theme={theme}>
          <FilmReviewSession/>
      </ThemeProvider>
    </div>
  );
};
