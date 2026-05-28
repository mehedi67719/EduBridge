
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import Footer from "./Footer";

const Root = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
