
import Root from "./Root";
import Home from "../Pages/Commanpages/Home";
import { createBrowserRouter } from "react-router";
import Notice from "../Pages/Commanpages/Notice";
import Routine from "../Pages/Commanpages/Routine";
import Assignment from "../Pages/Commanpages/Assignment";
import Results from "../Pages/Commanpages/Results";
import Chat from "../Pages/Commanpages/Chat";
import Dashboard from "../Pages/Commanpages/Dashboard";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import UploadNotice from "../Pages/Commanpages/UploadNotice";
import UploadAssignemnt from "../Pages/Teacher/UploadAssignemnt";


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
      },
  
      {
        path:'/results',
        Component:Results
      },
      {
        path:"/chat",
        Component:Chat
      },
      {
        path:"/dashboard",
        Component:Dashboard
      },
      {
        path:"/login",
        Component:Login
      },
      {
        path:"/register",
        Component:Register
      },
      {
        path:'/upload-notice',
        Component:UploadNotice
      },
      {
        path:"/upload-asssignment",
        Component:UploadAssignemnt
      }
    ],
  },
]);