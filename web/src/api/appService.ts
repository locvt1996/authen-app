import Axios from "axios";

// helpers
import { getCookie } from "../helpers/cookie";

const AppService = Axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/v1/`,
  params: {},
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

AppService.interceptors.request.use((request: any) => {
  request.headers["Authorization"] = `Bearer ${getCookie("token")}`;
  return request;
});

export default AppService;
