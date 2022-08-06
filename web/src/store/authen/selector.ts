import { RootState } from "../";

export const getUserInfo = (state: RootState) => {
  return state.authen.userInfo;
};

export const getLoadingAuthen = (state: RootState) => {
  return state.authen.loading;
};

export const getMessageRegister = (state: RootState) => {
  return state.authen.messageRegister;
};

export const getMessageLogin = (state: RootState) => {
  return state.authen.messageLogin;
};
