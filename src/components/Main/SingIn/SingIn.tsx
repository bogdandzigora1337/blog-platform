import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { message } from "antd";

import cl from "./SingIn.module.scss";

import SingInForm from "./SingInForm/SingInForm";
import SingInRegNotice from "./SingInRegNotice/SingInRegNotice";
import { clearUserLoginErrorAction } from "../../../redux/actions/authActions";

import { UserStateType } from "../../../types/types";

export const SingIn: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch<any>();
  const [messageApi, contextHolder] = message.useMessage();

  const loginFailedMessage = () => {
    messageApi.open({
      type: "error",
      content: "Login error, server side",
    });
  };

  const loginFailed = useSelector(
    (state: UserStateType) => state.logToAccountReducer.error
  );

  let previousPath = history.location.pathname;
  history.listen((location, action) => {
    if (
      action === "PUSH" &&
      previousPath === "/sing-in" &&
      location.pathname !== "/sing-in"
    ) {
      dispatch(clearUserLoginErrorAction());
    }
    previousPath = location.pathname;
  });

  const logInUserDetails = useSelector(
    (state: UserStateType) => state.logToAccountReducer.data
  );
  useEffect(() => {
    if (logInUserDetails) {
      history.push("/articles");
    }
    if (typeof loginFailed === "string") {
      loginFailedMessage();
    }
  }, [logInUserDetails, loginFailed]);

  return (
    <div className={cl["sing-in"]}>
      {contextHolder}
      <h1 className={cl["sing-in__title"]}>Sing In</h1>
      <SingInForm />
      <SingInRegNotice />
    </div>
  );
};
