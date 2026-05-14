
import Root from "./Root";
import Home from "../Pages/Commanpages/Home";
import { createBrowserRouter } from "react-router";
import Notice from "../Pages/Commanpages/Notice";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path:"/notice",
        Component:Notice
      }
    ],
  },
]);