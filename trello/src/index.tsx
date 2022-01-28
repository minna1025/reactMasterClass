import React from "react";
import ReactDOM from "react-dom";
import GlobalStyle from "./GlobalStyle";
import App from "./App";
import { darkTheme } from "./theme";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
