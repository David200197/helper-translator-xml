import { Toaster } from "react-hot-toast";
import "../app/globals.css";
import Navbar from "./components/layer/Navbar";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const App = () => {
  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;
