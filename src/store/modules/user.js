// 用户相关的状态

import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils/request";
import { getToken, setToken as _setToken, removeToken } from "../../utils";

const userStore = createSlice({
  // 模块名
  name: "user",

  // 初始状态
  initialState: {
    token: getToken() || "",
    userInfo: {},
  },

  // 修改状态的方法（同步）
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      _setToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearInfo(state) {
      state.token = ''
      state.userInfo = {};
      removeToken()
    },
  },
});

// 暴露修改状态的方法
export const { setToken, setUserInfo, clearInfo } = userStore.actions;

// 修改状态的方法（异步）
// 1、登录
export function fetchLogin(loginForm) {
  return async function (dispatch) {
    // 发请求
    const res = await request.post("/authorizations", loginForm);
    // 触发 reducers 中的方法修改状态
    dispatch(setToken(res.data.data.token));
  };
}
// 2、获取用户信息
export function fetchUserInfo() {
  return async function (dispatch) {
    // 发请求
    const res = await request.get('/user/profile');
    // 触发 reducers 中的方法修改状态
    dispatch(setUserInfo(res.data.data));
  };
}

// 暴露 reducer 函数
const userReducer = userStore.reducer;
export default userReducer;
