import { Toaster } from "react-hot-toast";
import "../app/globals.css";
import Navbar from "./components/layer/Navbar";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const App = () => {
  return (
    <div className="w-full h-screen pt-10">
      <Navbar />
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
};

export default App;
