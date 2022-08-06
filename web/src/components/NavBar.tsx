import React, { memo, useEffect } from "react";
import { useHistory } from "react-router-dom";
// selector
import { useAppSelector } from "../hooks/useAppSelector";
import { getUserInfo } from "../store/authen/selector";
import UserInfo from "./UserInfo";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const history = useHistory();
  const userInfo = useAppSelector(getUserInfo);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo]);

  return (
    <nav className="container flex items-center mb-16" data-testid="nav-bar">
      <div className="w-2/5 flex items-center">
        <h1 className="text-5xl ml-8">Authentication App</h1>
      </div>
      <div className="w-3/5">
        {userInfo && <UserInfo userInfo={userInfo} />}
      </div>
    </nav>
  );
};

export default memo(NavBar);
