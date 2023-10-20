import React from "react";

import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import cl from "./Main.module.scss";

import { ArticlesList } from "./ArticlesList/ArticlesList";
import PaginationArticles from "./PaginationArticles/PaginationArticles";
import { ArticleExpanded } from "./ArticleExpanded/ArticleExpanded";
import { SingInForm } from "./SingInForm/SingInForm";
import { SingUpForm } from "./SingUpForm/SingUpForm";
import { ProfileEditingForm } from "./ProfileEditingForm/ProfileEditingForm";
import { ArticlesCreating } from "./CreatingArticles/CreatingArticles";

type HasErrorType = {
  articlesReducer: {
    error: null | string;
  };
};

type IsAuthenticatedType = {
  logToAccountReducer: {
    data: object | null;
  };
};

const Main: React.FC = () => {
  const hasError = useSelector(
    (state: HasErrorType) => state.articlesReducer.error
  );

  const isAuthenticated = useSelector(
    (state: IsAuthenticatedType) => !!state.logToAccountReducer.data
  );

  return (
    <div className={cl["main"]}>
      <Route path={"/profile"} render={() => <ProfileEditingForm />} />
      <Route path={"/sing-in"} render={() => <SingInForm />} />
      <Route path={"/sing-up"} render={() => <SingUpForm />} />
      <Route path={"/new-article"}>
        {isAuthenticated ? <ArticlesCreating /> : <Redirect to={"/sing-in"} />}
      </Route>

      {!hasError ? (
        <>
          <Route path="/articles/:slug/edit" component={ArticlesCreating} />
          <Route
            exact={true}
            path="/articles/:slug"
            component={ArticleExpanded}
          />

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
