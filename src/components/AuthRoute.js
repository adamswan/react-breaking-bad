import { getToken } from "../utils/token";
import { Navigate } from "react-router-dom";

export function AuthRoute(props) {
  // 传进来的子组件，例如 <Layout />
  let { children } = props;

  let token = getToken();

  if (token) {
    // token 存在，原样返回子组件
    return <>{children}</>;
  } else {
    // token 不存在，强制重定向到 login
    return <Navigate to={"/login"} replace></Navigate>;
  }
}
