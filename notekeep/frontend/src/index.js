import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <div className="center">
        <App />
      </div>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("app")
);
