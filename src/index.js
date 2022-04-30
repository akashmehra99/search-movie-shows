import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import indexCss from './index.css';

import { Container } from "./components/container/container.component";
import { SideMenu } from "./components/side-menu/sideMenu.component";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const App = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <div className={indexCss.app}>
                <Container />
                <SideMenu />
            </div>
        </ThemeProvider>
    );
};

ReactDOM.render(<App />, document.querySelector("#root"));