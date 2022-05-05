import React, { StrictMode, Component } from "react";
import { createRoot } from "react-dom/client";
import { Provider, Connect } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";

import "./index.css";

import store from "./store/configureStore";

import { Container } from "./components/container/container.component";
import SideMenu from "./components/side-menu/sideMenu.component";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

let theme = createTheme({
  palette: {
    mode: "light",
  },
});

const discoverStore = store;
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkThemeMq.matches) {
      theme = deepmerge(theme, darkTheme)
    }
    return (
      <ThemeProvider theme={theme}>
        <Provider store={discoverStore}>
          <div className="app">
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
