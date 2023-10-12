import React from "react";

import { Route } from "react-router-dom";

import cl from "./Main.module.scss";

import { ArticlesList } from "./ArticlesList/ArticlesList";
import PaginationArticles from "./PaginationArticles/PaginationArticles";
import ArticleExpanded from "./ArticleExpanded/ArticleExpanded";

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
          <Route
            path="/articles/:slug"
            render={() => {
              return <ArticleExpanded />;
            }}
          ></Route>

          <Route
            exact={true}
            path={["/articles", "/"]}
            component={ArticlesList}
          ></Route>

          <Route
            exact
            path={["/articles", "/"]}
            component={PaginationArticles}
          />
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
