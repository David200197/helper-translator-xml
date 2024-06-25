import MainPage from "@/components/page/main";
import Root from "@/components/page/root";
import TranslatePage from "@/components/page/translate";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/:id",
        element: <TranslatePage />,
      },
    ],
  },
]);
