import { createBrowserRouter } from "react-router-dom";

import ProtectedLayout from "../components/ProtectedLayout";
import Authenticate from "../components/Authenticate";
import Play from "../components/Play";
import Partner from "../components/Partner";
import Favorites from "../components/Favorites";
import Settings from "../components/Settings";
import ErrorPage from "./error-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "auth",
        element: <Authenticate />,
      },
      {
        path: "/",
        element: <Play />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "partner",
        element: <Partner />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);
