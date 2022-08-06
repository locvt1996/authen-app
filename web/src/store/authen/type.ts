export interface IUserInfo {
  email: string;
  id: string;
}

export interface IAuthen {
  loading: boolean;
  messageLogin: string;
  messageRegister: string;
  userInfo: IUserInfo | null;
}

export interface IAuthenApiReturn {
  userInfo: IUserInfo;
  token: string;
}

export interface IRegisterReturn {
  message: string;
}

export interface IAuthenApiPostData {
  email: string;
  password: string;
}

export interface IAuthenFacebookApiPostData {
  accessToken: string;
}
