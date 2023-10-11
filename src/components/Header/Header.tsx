import React from "react";

import cl from "./Header.module.scss";

import AuthProfile from "./AuthProfile/AuthProfile";

const Header: React.FC = () => {
  return (
    <header className={cl["header"]}>
      <h1 className={cl["header__name-title"]}>Realworld Blog</h1>
      <AuthProfile />
    </header>
  );
};

export default Header;
