import React, { memo } from "react";
import AuthenForm from "../components/AuthenForm";

// selector
import { useAppSelector } from "../hooks/useAppSelector";
import { getMessageRegister } from "../store/authen/selector";

interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = ({}) => {
  const message = useAppSelector(getMessageRegister);

  return (
    <div data-testid="register-page">
      <h1 className="text-5xl mb-8">Register</h1>

      <AuthenForm />

      {message && <div className="mb-3">{message}</div>}
    </div>
  );
};

export default memo(RegisterPage);
