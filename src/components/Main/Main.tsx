import React from "react";

import cl from "./Main.module.scss";

import { ArticlesList } from "./ArticlesList/ArticlesList";
import PaginationArticles from "./PaginationArticles/PaginationArticles";

import { useSelector } from "react-redux";

type HasErrorType = {
  articlesReducer: {
    error: null | string;
  };
};

const Main: React.FC = () => {
  const hasError = useSelector(
    (state: HasErrorType) => state.articlesReducer.error
  );

  return (
    <div className={cl["main"]}>
      {!hasError ? (
        <>
          <ArticlesList />
          <PaginationArticles />
        </>
      ) : (
        <h1 className={cl["main__error-notification"]}>
          ⚠️ Произошла ошибка при получении данных с сервера!
        </h1>
      )}
    </div>
  );
};

export default Main;
