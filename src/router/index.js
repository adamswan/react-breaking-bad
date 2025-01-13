import Layout from "../pages/Layout";
import Login from "../pages/Login";
import NotFount from "../pages/NotFount";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFount />,
  }
])

export default router; 