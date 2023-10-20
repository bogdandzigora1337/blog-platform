import React from "react";
import { Button } from "antd";
import cl from "./UserProfileHeader.module.scss";

import { useSelector, useDispatch } from "react-redux";
import { logOutAction } from "../../../redux/actions";
import { Link } from "react-router-dom";

type LogInUserDetailsType = {
  logToAccountReducer: {
    data: null | {
      user: { username: string; email: string; token: string; image: string };
    };
  };
};

export const UserProfileHeader: React.FC = () => {
  const dispatch = useDispatch<any>();

  const handleClick = () => {
    dispatch(logOutAction());
  };

  const logInUserDetails = useSelector(
    (state: LogInUserDetailsType) => state.logToAccountReducer.data?.user
  );

  return (
    <div className={cl["header__user-profile"]}>
      <Link
        to={"/new-article"}
        className={cl["header__user-profile__link--create-article"]}
      >
        <Button
          className={cl["header__btn--create-article"]}
          style={{
            borderColor: "1px solid var(--success-color, #52C41A)",
            color: "var(--success-color, #52C41A)",
          }}
        >
          Create article
          <img
            src="https://cdn-icons-png.flaticon.com/512/4581/4581800.png"
            className={cl["header__btn--create-article__icon"]}
          ></img>
        </Button>
      </Link>

      <Link to="/profile" className={cl["header__user-profile__link"]}>
        <div className={cl["header__user-profile__data"]}>
          <h6 className={cl["header__user-profile__data__username"]}>
            {logInUserDetails?.username}
          </h6>

          <img
            className={cl["header__user-profile__data__image"]}
            src={
              logInUserDetails?.image ||
              "https://www.meme-arsenal.com/memes/9deabcb50a53c324b3a4981528215040.jpg"
            }
            alt="no-image"
          />
        </div>
      </Link>

      <Button
        className={cl["header__btn--log-out"]}
        style={{
          borderColor: "1px solid var(--success-color, #000000BF)",
          color: "var(--success-color, #000000BF)",
        }}
        onClick={handleClick}
      >
        Log Out
        <img
          src="https://cdn-icons-png.flaticon.com/512/61/61208.png"
          className={cl["header__btn--log-out__icon"]}
        ></img>
      </Button>
    </div>
  );
};
