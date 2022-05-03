import React, { StrictMode, Component } from "react";
import { createRoot } from "react-dom/client"
import { Provider, Connect } from "react-redux"
import { ThemeProvider, createTheme } from '@mui/material/styles';

import indexCss from './index.css';

import store from "./store/configureStore";

import { Container } from "./components/container/container.component";
import SideMenu from "./components/side-menu/sideMenu.component";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const discoverStore = store;
class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ThemeProvider theme={darkTheme}>
                <Provider store={discoverStore}>
                    <div className={indexCss.app}>
                        <Container />
                        <SideMenu />
                    </div>
                </Provider>
            </ThemeProvider>
        );
    }
}

const root = createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
