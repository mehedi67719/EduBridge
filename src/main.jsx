import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { router } from "./Components/router";

import Authprovider from "./Authentaction/Authprovider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Authprovider>
        <RouterProvider router={router} />
    </Authprovider>
  </StrictMode>,
);
