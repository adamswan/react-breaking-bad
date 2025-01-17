import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import NotFount from "@/pages/NotFount";
import { AuthRoute } from "../components/AuthRoute";
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("@/pages/Home"));
const Article = lazy(() => import("@/pages/Article"));
const Publish = lazy(() => import("@/pages/Publish"));

const router = createBrowserRouter([
  {
    path: "/",
    // Layout 需要 token 才能访问
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={"loading"}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "article",
        element: (
          <Suspense fallback={"loading"}>
            <Article />
          </Suspense>
        ),
      },
      {
        path: "publish",
        element: (
          <Suspense fallback={"loading"}>
            <Publish />
          </Suspense>
        ),
      },
    ],
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
