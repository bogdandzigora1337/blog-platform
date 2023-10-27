import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import cl from "./Header.module.scss";

import AuthProfile from "./AuthProfile/AuthProfile";
import LoaderArticles from "./LoaderArticles/LoaderArticles";
import { UserProfileHeader } from "./UserProfileHeader/UserProfileHeader";
import { currentArticlesPage } from "../../redux/actions/articleActions";
import { getArticles } from "../../redux/actions/articleActions";

type UserTokenType = {
  logToAccountReducer: {
    data: {
      user: {
        token?: string;
        image?: string;
        email?: string;
        username?: string;
      } | null;
    } | null;
  };
};

type LogInUserDetailsType = {
  logToAccountReducer: {
    data: null | { user: { username: string; email: string; token: string } };
  };
};

const Header: React.FC = () => {
  const dispatch = useDispatch<any>();

  const userToken = useSelector(
    (state: UserTokenType) => state.logToAccountReducer.data?.user?.token
  );

  const logInUserDetails = useSelector(
    (state: LogInUserDetailsType) => state.logToAccountReducer.data
  );

  return (
    <header className={cl["header"]}>
      <div className={cl["header__container"]}>
        <Link
          to={`/articles/`}
          className={cl["header__title"]}
          onClick={() => {
            dispatch(currentArticlesPage(1));
            dispatch(getArticles(5, 0, userToken));
          }}
        >
          <p>Realworld Blog</p>
        </Link>
        {logInUserDetails ? <UserProfileHeader /> : <AuthProfile />}
      </div>
      <LoaderArticles />
    </header>
  );
};

export default Header;
