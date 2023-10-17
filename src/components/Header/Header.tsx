import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import cl from "./Header.module.scss";

import AuthProfile from "./AuthProfile/AuthProfile";
import LoaderArticles from "./LoaderArticles/LoaderArticles";
import { UserProfileHeader } from "./UserProfileHeader/UserProfileHeader";

type LogInUserDetailsType = {
  logToAccountReducer: {
    data: null | { user: { username: string; email: string; token: string } };
  };
};

const Header: React.FC = () => {
  const logInUserDetails = useSelector(
    (state: LogInUserDetailsType) => state.logToAccountReducer.data
  );

  return (
    <header className={cl["header"]}>
      <div className={cl["header__container"]}>
        <Link to={`/articles/`} className={cl["header__title"]}>
          <h1>Realworld Blog</h1>
        </Link>
        {logInUserDetails ? <UserProfileHeader /> : <AuthProfile />}
      </div>
      <LoaderArticles />
    </header>
  );
};

export default Header;
