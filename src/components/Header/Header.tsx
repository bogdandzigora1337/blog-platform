import React from "react";
import { Link } from "react-router-dom";

import cl from "./Header.module.scss";

import AuthProfile from "./AuthProfile/AuthProfile";
import LoaderArticles from "./LoaderArticles/LoaderArticles";

const Header: React.FC = () => {
  return (
    <header className={cl["header"]}>
      <div className={cl["header__container"]}>
        <Link to={`/articles/`} className={cl["header__title"]}>
          <h1>Realworld Blog</h1>
        </Link>

        <AuthProfile />
      </div>
      <LoaderArticles />
    </header>
  );
};

export default Header;
