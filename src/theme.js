import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#FF5B50"
        }, 
        secondary: {
            main: "#4AB9BD"
        }, 
        type: "dark"
    }, 
    typography: {
        fontFamily: [
            'Segoe UI',
            'Open Sans',
            'Roboto',
            'Arial',
            'sans-serif',
        ].join(','),
        h1 : {
            fontWeight: 800, 
            color: "#FFFFFF"
        }, 
        h2 : {
            color: "#FFFFFF"
        }, 
        h3 : {
            color: "#FFFFFF"
        }, 
        h4 : {
            color: "#FFFFFF"
        }, 
        h5 : {
            color: "#FFFFFF"
        }, 
        h6 : {
            color: "#FFFFFF"
        },
        spacing : 2

      }, 
})

export default theme;