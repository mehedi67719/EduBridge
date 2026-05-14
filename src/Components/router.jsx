
import Root from "./Root";
import Home from "../Pages/Commanpages/Home";
import { createBrowserRouter } from "react-router";
import Notice from "../Pages/Commanpages/Notice";
import Routine from "../Pages/Commanpages/Routine";
import Assignment from "../Pages/Commanpages/Assignment";


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
      },
      {
        path:"/routine",
        Component:Routine
      },
      {
        path:'/assignment',
        Component:Assignment
      }
    ],
  },
]);