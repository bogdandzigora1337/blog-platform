import React from "react";
import { Link } from "react-router-dom";
import { Button, Space } from "antd";

import cl from "./AuthProfile.module.scss";

const AuthProfile: React.FC = () => {
  return (
    <Space className={cl["auth-profile"]}>
      <Link to="/sing-in">
        <Button
          className={`${cl["auth-profile__button"]}`}
          style={{
            color: "var(--heading-color, rgba(0, 0, 0, 0.85)),",
          }}
          type="link"
        >
          Sing In
        </Button>
      </Link>

      <Link to="/sing-up">
        <Button
          className={`${cl["auth-profile__button"]} `}
          style={{
            borderColor: "1px solid var(--success-color, #52C41A)",
            color: "var(--success-color, #52C41A)",
          }}
        >
          Sing Up
        </Button>
      </Link>
    </Space>
  );
};

export default AuthProfile;
