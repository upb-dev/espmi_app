import React from "react";
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider } from "@mui/styled-engine";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "../src/app/App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <CssBaseline>
          <App />
        </CssBaseline>
      </BrowserRouter>
    </StyledEngineProvider>
  </React.StrictMode>
);
