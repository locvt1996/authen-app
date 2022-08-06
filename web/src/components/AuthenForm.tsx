import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

// services
import {
  loginApi,
  registerApi,
  loginFacebookApi,
} from "../store/authen/service";

// selectors
import { useAppSelector } from "../hooks/useAppSelector";
import { getLoadingAuthen } from "../store/authen/selector";

// helper
import { checkSuccessResponse } from "../helpers/api";

// component
import FacebookLogin from "react-facebook-login";

interface AuthenFormProps {
  isLoginPage?: boolean;
}

interface IValueForm {
  email: string;
  password: string;
}

const initialForm = {
  email: "",
  password: "",
};

const AuthenForm: React.FC<AuthenFormProps> = ({ isLoginPage }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [valueForm, setValueForm] = useState<IValueForm>(initialForm);

  const loading = useAppSelector(getLoadingAuthen);

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValueForm((preValue) => ({
        ...preValue,
        [event.target.id]: event.target.value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    const response = await dispatch(
      isLoginPage ? loginApi(valueForm) : registerApi(valueForm)
    );

    if (checkSuccessResponse(response)) {
      setValueForm(initialForm);
      if (isLoginPage) {
        history.push("/");
      }
    }
  }, [valueForm, dispatch]);

  const responseFacebook = useCallback(async (response: any) => {
    if (response?.accessToken) {
      const result = await dispatch(
        loginFacebookApi({ accessToken: response?.accessToken })
      );

      if (checkSuccessResponse(result)) history.push("/");
    }
  }, []);

  const onSuccess = (response: any) => console.log(response);
  const onFailure = (response: any) => console.error(response);

  return (
    <div className="w-full d-flex flex justify-center">
      <form
        className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ${
          loading && "loading"
        }`}
      >
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={valueForm.email}
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-6">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={valueForm.password}
            onChange={handleOnChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <Link
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            to={isLoginPage ? "register" : "login"}
          >
            {isLoginPage ? "Register" : "Login"}
          </Link>
        </div>
        <div className="flex items-center justify-between mt-3">
          <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_ID as string}
            fields="name,email,picture"
            size="small"
            autoLoad={false}
            callback={responseFacebook}
          />
        </div>
      </form>
    </div>
  );
};

export default AuthenForm;
