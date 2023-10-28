import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import cl from "./ProfileEditing.module.scss";

import { clearChangeUserDataErrAction } from "../../../redux/actions/authActions";
import ProfileEditAccessMessage from "./ProfileEditAccessMessage/ProfileEditAccessMessage";
import ProfileEditingForm from "./ProfileEditingForm/ProfileEditingForm";
import SuccessUpdateMessage from "./SuccessUpdateMessage/SuccessUpdateMessage";
import { UserStateType } from "../../../types/types";

export const ProfileEditing: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch<any>();
  const userToken = useSelector(
    (state: UserStateType) => state.logToAccountReducer?.data?.user?.token
  );
  const editingError = useSelector(
    (state: UserStateType) => state.logToAccountReducer.editingError
  );

  const userData = useSelector(
    (state: UserStateType) => state.logToAccountReducer.data
  );

  history.listen((location, action) => {
    if (action === "PUSH" && location.pathname !== "/profile") {
      dispatch(clearChangeUserDataErrAction());
    }
  });

  const renderContent = () => {
    if (!userToken) {
      return <ProfileEditAccessMessage />;
    } else if (typeof editingError === "string") {
      return <h1>{editingError}</h1>;
    } else if (editingError === false) {
      return <SuccessUpdateMessage />;
    } else {
      return (
        <ProfileEditingForm
          userToken={userToken}
          userData={userData}
          editingError={editingError}
        />
      );
    }
  };

  return (
    <div className={cl["edit-profile"]}>
      <h1 className={cl["edit-profile__title"]}>Edit Profile</h1>
      {renderContent()}
    </div>
  );
};
