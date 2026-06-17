import Root from "./Root";
import Home from "../Pages/Commanpages/Home";
import { createBrowserRouter } from "react-router";
import Routine from "../Pages/Commanpages/Routine";
import Results from "../Pages/Commanpages/Results";
import Chat from "../Pages/Commanpages/Chat";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardRoot from "./DashboardRoot";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import UploadRoutine from "../Pages/Teacher/UploadRoutine";
import Profile from "../Pages/Commanpages/Profile";
import Seeting from "../Pages/Commanpages/Seeting";
import UploadAssignment from "../Pages/Teacher/Assignment/UploadAssignemnt";
import Notice from "../Pages/Commanpages/Notice/Notice";
import UploadNotice from "../Pages/Commanpages/Notice/UploadNotice";
import NoticeDetails from "../Pages/Commanpages/Notice/NoticeDetails";
import Assignment from "../Pages/Commanpages/Assignment/Assignment";
import Submitassignment from "../Pages/Commanpages/Assignment/Submitassignment";
import Assignmentdetels from "../Pages/Commanpages/Assignment/Assignmentdetels";

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
        path: "/notice",
        Component: Notice,
      },
      {
        path: "/notice/details/:id",
        Component: NoticeDetails,
      },
      {
        path: "/routine",
        Component: Routine,
      },
      {
        path: "/assignment",
        Component: Assignment,
      },
      {
        path: "/assignment/submit/:id",
        Component: Submitassignment,
      },
      {
        path: "/assignment/:id",
        Component: Assignmentdetels,
      },
      {
        path: "/results",
        Component: Results,
      },
      {
        path: "/chat",
        Component: Chat,
      },

      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardRoot,
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "/dashboard/upload-notice",
        Component: UploadNotice,
      },
      {
        path: "/dashboard/upload-assignment",
        Component: UploadAssignment,
      },
      {
        path: "/dashboard/upload-routine",
        Component: UploadRoutine,
      },
      {
        path: "/dashboard/profile",
        Component: Profile,
      },
      {
        path: "/dashboard/settings",
        Component: Seeting,
      },
    ],
  },
]);
