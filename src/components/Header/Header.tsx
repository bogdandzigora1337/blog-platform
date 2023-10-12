import React from "react";

import cl from "./Header.module.scss";

import AuthProfile from "./AuthProfile/AuthProfile";
import LoaderArticles from "./LoaderArticles/LoaderArticles";

const Header: React.FC = () => {
  return (
    <header className={cl["header"]}>
      <div className={cl["header__container"]}>
        <h1 className={cl["header__name-title"]}>Realworld Blog</h1>
        <AuthProfile />
      </div>
      <LoaderArticles />
    </header>
  );
};

export default Header;
