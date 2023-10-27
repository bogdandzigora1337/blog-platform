import React from "react";

import { useDispatch } from "react-redux";
import { Button } from "antd";

import cl from "./SuccessUpdateMessage.module.scss";

import { IconProfile } from "../IconProfile";
import { clearChangeUserDataErr } from "../../../../redux/actions/authActions";

const SuccessUpdateMessage: React.FC = () => {
  const dispatch = useDispatch<any>();

  const buttonStyles = {
    borderColor: "1px solid var(--success-color, #b7eb8f)",
    color: "var(--success-color, #52c41a)",
  };

  return (
    <div className={cl["success-notification"]}>
      <p>
        <span>{<IconProfile />}</span> Data has been successfully updated.
      </p>
      <Button
        onClick={() => dispatch(clearChangeUserDataErr())}
        style={buttonStyles}
      >
        Close notification
      </Button>
    </div>
  );
};

export default SuccessUpdateMessage;
