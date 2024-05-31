import { Toaster } from "react-hot-toast";
import "../app/globals.css";
import Navbar from "./components/layer/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Toaster />
    </>
  );
};

export default App;
