import React from "react";

import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

import cl from "./Main.module.scss";

import { ArticlesList } from "./ArticlesList/ArticlesList";
import PaginationArticles from "./PaginationArticles/PaginationArticles";
import { ArticleExpanded } from "./ArticleExpanded/ArticleExpanded";
import { SingInForm } from "./SingInForm/SingInForm";
import { SingUpForm } from "./SingUpForm/SingUpForm";
import { ProfileEditingForm } from "./ProfileEditingForm/ProfileEditingForm";

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
      <Route path={"/profile"} render={() => <ProfileEditingForm />} />
      <Route path={"/sing-in"} render={() => <SingInForm />} />
      <Route path={"/sing-up"} render={() => <SingUpForm />} />
      {!hasError ? (
        <>
          <Route path="/articles/:slug" render={() => <ArticleExpanded />} />

          <Route
            exact={true}
            path={["/articles", "/"]}
            component={ArticlesList}
          />

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
