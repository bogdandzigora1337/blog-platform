import React from "react";

import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { clearRegUserDataAction } from "../../../redux/actions/authActions";

import cl from "./SingUp.module.scss";

import { SingUpForm } from "./SingUpForm/SingUpForm";
import SingUpLogNotice from "./SingUpLogNotice/SingUpLogNotice";
import SingUpSuccessfulRegNotification from "./SingUpSuccessfulRegNotification/SingUpSuccessfulRegNotification";

type RegUserData = {
  registrationReducer: {
    data: {
      user: {
        username: string;
        email: string;
        token: string;
      };
    };
  };
};

export const SingUp: React.FC = () => {
  const dispatch = useDispatch<any>();
  const history = useHistory();

  let previousPath = history.location.pathname;
  history.listen((location, action) => {
    if (
      action === "PUSH" &&
      previousPath === "/sing-up" &&
      location.pathname !== "/sing-up"
    ) {
      dispatch(clearRegUserDataAction());
    }
    previousPath = location.pathname;
  });

  const regUserData = useSelector(
    (state: RegUserData) => state.registrationReducer.data
  );

  return (
    <div className={cl["sing-up"]}>
      <h1 className={cl["sing-up__title"]}>Create new account</h1>
      {regUserData ? (
        <SingUpSuccessfulRegNotification />
      ) : (
        <>
          <SingUpForm />
          <SingUpLogNotice />
        </>
      )}
    </div>
  );
};
