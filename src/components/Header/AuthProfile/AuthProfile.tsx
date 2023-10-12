import React from "react";
import { Button, Space } from "antd";

import cl from "./AuthProfile.module.scss";

const AuthProfile: React.FC = () => {
  return (
    <Space className={cl["auth-profile"]}>
      <Button
        className={`${cl["auth-profile__button"]}`}
        style={{
          color: "var(--heading-color, rgba(0, 0, 0, 0.85)),",
        }}
        type="link"
      >
        Sing In
      </Button>
      <Button
        className={`${cl["auth-profile__button"]} `}
        style={{
          borderColor: "1px solid var(--success-color, #52C41A)",
          color: "var(--success-color, #52C41A)",
        }}
      >
        Sing Up
      </Button>
    </Space>
  );
};

export default AuthProfile;
