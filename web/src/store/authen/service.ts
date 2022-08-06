import { createAsyncThunk } from "@reduxjs/toolkit";
import AppService from "../../api/appService";

// types
import {
  IAuthenApiReturn,
  IAuthenApiPostData,
  IAuthenFacebookApiPostData,
  IRegisterReturn,
} from "./type";

export const loginApi = createAsyncThunk<IAuthenApiReturn, IAuthenApiPostData>(
  "auth/login",
  async (req, thunkApi) => {
    try {
      const response = await AppService.post("auth/login", req);

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.response);
    }
  }
);

export const loginFacebookApi = createAsyncThunk<
  IAuthenApiReturn,
  IAuthenFacebookApiPostData
>("auth/loginFacebookApi", async (req, thunkApi) => {
  try {
    const response = await AppService.post("auth/login-facebook", req);

    return response.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error?.response);
  }
});

export const registerApi = createAsyncThunk<
  IRegisterReturn,
  IAuthenApiPostData
>("auth/register", async (req, thunkApi) => {
  try {
    const response = await AppService.post("auth/register", req);

    return response.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error?.response);
  }
});

export const tryLoginApi = createAsyncThunk<IAuthenApiReturn>(
  "auth/try-login",
  async (_, thunkApi) => {
    try {
      const response = await AppService.post("auth/try-login", {});

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.response);
    }
  }
);
