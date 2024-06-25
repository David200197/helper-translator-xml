import { Outlet } from "react-router-dom";
import Navbar from "../layer/Navbar";
import { Toaster } from "react-hot-toast";

const Root = () => (
  <div className="w-full h-screen pt-10">
    <Navbar />
    <Outlet />
    <Toaster />
  </div>
);
export default Root;
