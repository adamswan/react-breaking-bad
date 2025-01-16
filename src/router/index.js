import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import NotFount from "@/pages/NotFount";
import { AuthRoute } from "../components/AuthRoute";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    // Layout 需要 token 才能访问
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFount />,
  },
]);

export default router;
