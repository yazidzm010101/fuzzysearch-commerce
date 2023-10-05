import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index";

import React from "react";

function Router() {
  return (
    <Routes>
      <Route path={"/"} element={<Index />} />
    </Routes>
  );
}

export default Router;