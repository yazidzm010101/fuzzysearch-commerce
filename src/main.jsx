import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.js";
import Router from "@/Router.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter basename={"/fuzzysearch-commerce/"}>
        <Router />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
