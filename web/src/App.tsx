import "./App.css";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// service
import { tryLoginApi } from "./store/authen/service";

function App() {
  const dispath = useDispatch();

  useEffect(() => {
    dispath(tryLoginApi());
  }, [dispath]);

  return (
    <div className="container px-5 py-10 mx-auto text-center lg:px-40">
      <NavBar />

      {/* <Route
        exact
        path="/login"
        render={(reactRouterProps: any) => {
          return <HomePage {...reactRouterProps} />;
        }}
      /> */}
      <Route path="/login" exact component={LoginPage} />
      <Route path="/register" exact component={RegisterPage} />
    </div>
  );
}

export default App;
