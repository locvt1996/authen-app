import { createSlice } from "@reduxjs/toolkit";

// services
import {
  loginApi,
  loginFacebookApi,
  registerApi,
  tryLoginApi,
} from "./service";

// types
import { IAuthen } from "./type";

// helpers
import { setCookie, deleteCookie } from "../../helpers/cookie";

const initialState: IAuthen = {
  loading: false,
  messageLogin: "",
  messageRegister: "",
  userInfo: null,
};

const { reducer, actions } = createSlice({
  name: "authen",
  initialState,
  reducers: {
    logoutAction: (state) => {
      state.userInfo = null;
      deleteCookie("token");
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder.addCase(loginApi.pending, (state) => {
      state.loading = true;
      state.messageLogin = "";
    });
    builder.addCase(loginApi.fulfilled, (state, action) => {
      const { userInfo, token } = action?.payload;
      state.loading = false;
      state.messageLogin = "";
      state.userInfo = userInfo;
      setCookie("token", token, 90);
    });
    builder.addCase(loginApi.rejected, (state, action) => {
      const { data } = action?.payload as any;
      state.loading = false;
      state.messageLogin = data?.message;
    });

    // LOGIN FACEBOOK
    builder.addCase(loginFacebookApi.pending, (state) => {
      state.loading = true;
      state.messageLogin = "";
    });
    builder.addCase(loginFacebookApi.fulfilled, (state, action) => {
      const { userInfo, token } = action?.payload;
      state.loading = false;
      state.messageLogin = "";
      state.userInfo = userInfo;
      setCookie("token", token, 90);
    });
    builder.addCase(loginFacebookApi.rejected, (state, action) => {
      const { data } = action?.payload as any;
      state.loading = false;
      state.messageLogin = data?.message;
    });

    // TRY LOGIN
    builder.addCase(tryLoginApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(tryLoginApi.fulfilled, (state, action) => {
      const { userInfo } = action?.payload as any;
      state.loading = false;
      state.userInfo = userInfo;
    });
    builder.addCase(tryLoginApi.rejected, (state, action) => {
      state.loading = false;
    });

    // REGISTER
    builder.addCase(registerApi.pending, (state) => {
      state.loading = true;
      state.messageRegister = "";
    });
    builder.addCase(registerApi.fulfilled, (state, action) => {
      const { message } = action?.payload as any;
      state.loading = false;
      state.messageRegister = message;
    });
    builder.addCase(registerApi.rejected, (state, action) => {
      const { data } = action?.payload as any;
      state.loading = false;
      state.messageRegister = data?.message;
    });
  },
});

const { logoutAction } = actions;

export { logoutAction };

export default reducer;
