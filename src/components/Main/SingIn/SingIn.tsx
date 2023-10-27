import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import cl from "./SingIn.module.scss";

import SingInForm from "./SingInForm/SingInForm";
import SingInRegNotice from "./SingInRegNotice/SingInRegNotice";

type LogInUserDetailsType = {
  logToAccountReducer: {
    data: null | { user: { username: string; email: string; token: string } };
  };
};

export const SingIn: React.FC = () => {
  const history = useHistory();

  const logInUserDetails = useSelector(
    (state: LogInUserDetailsType) => state.logToAccountReducer.data
  );
  useEffect(() => {
    if (logInUserDetails) {
      history.push("/articles");
    }
  }, [logInUserDetails]);

  return (
    <div className={cl["sing-in"]}>
      <h1 className={cl["sing-in__title"]}>Sing In</h1>
      <SingInForm />
      <SingInRegNotice />
    </div>
  );
};
