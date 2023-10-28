import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "antd";

import cl from "./UserProfileHeader.module.scss";

import { logOutActionAction } from "../../../redux/actions/authActions";
import { UserStateType } from "../../../types/types";

export const UserProfileHeader: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOutActionAction());
  };

  const logInUserDetails = useSelector(
    (state: UserStateType) => state.logToAccountReducer.data?.user
  );

  return (
    <div className={cl["header__user-profile"]}>
      <Link
        to="/new-article"
        className={cl["header__user-profile__link--create-article"]}
      >
        <CustomButton
          classBtn="header__btn--create-article"
          classImg="header__btn--create-article__icon"
          text="Create article"
          borderColor="var(--success-color, #52C41A)"
          color="var(--success-color, #52C41A)"
          iconSrc="https://cdn-icons-png.flaticon.com/512/4581/4581800.png"
          alt="Create Article Icon"
        />
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

      <CustomButton
        classBtn="header__btn--log-out"
        classImg="header__btn--log-out__icon"
        text="Log Out"
        borderColor="var(--success-color, #000000BF)"
        color="var(--success-color, #000000BF)"
        iconSrc="https://cdn-icons-png.flaticon.com/512/61/61208.png"
        alt="Log Out Icon"
        onClick={handleLogOut}
      />
    </div>
  );
};

interface ButtonProps {
  text: string;
  borderColor: string;
  color?: string;
  iconSrc?: string;
  alt?: string;
  classBtn?: string;
  classImg?: string;
  onClick?: () => void;
}

const CustomButton: React.FC<ButtonProps> = ({
  text,
  classBtn,
  classImg,
  borderColor,
  color,
  iconSrc,
  alt,
  onClick,
}) => {
  return (
    <Button
      className={cl[`${classBtn}`]}
      style={{
        borderColor: `1px solid ${borderColor}`,
        color: color,
      }}
      onClick={onClick}
    >
      {text}
      <img src={iconSrc} alt={alt} className={cl[`${classImg}`]} />
    </Button>
  );
};
