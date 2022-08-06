import React, { memo } from "react";

import AuthenForm from "../components/AuthenForm";

// selector
import { useAppSelector } from "../hooks/useAppSelector";
import { getMessageLogin,  } from "../store/authen/selector";

interface HomaPageProps {}

const HomePage: React.FC<HomaPageProps> = ({}) => {
  const message = useAppSelector(getMessageLogin);

  return (
    <div data-testid="login-page">
      <h1 className="text-5xl mb-8">Login</h1>

      <AuthenForm isLoginPage={true} />

      {message && <div className="mb-3">{message}</div>}
    </div>
  );
};

export default memo(HomePage);
