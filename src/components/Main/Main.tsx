import React from "react";

import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import cl from "./Main.module.scss";

import { ArticlesList } from "./ArticlesList/ArticlesList";
import PaginationArticles from "./PaginationArticles/PaginationArticles";
import { ArticleExpanded } from "./ArticleExpanded/ArticleExpanded";
import { SingIn } from "./SingIn/SingIn";
import { SingUp } from "./SingUp/SingUp";
import { ProfileEditing } from "./ProfileEditing/ProfileEditing";
import { ArticlesCreating } from "./ArticlesCreating/ArticleCreating";

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

  const articleErrorNotification = () => (
    <h1 className={cl["main__error-notification"]}>
      ⚠️ An error occurred while receiving data from the server! Try refreshing
      the page
    </h1>
  );

  return (
    <div className={cl["main"]}>
      <Route path={"/profile"} render={() => <ProfileEditing />} />
      <Route path={"/sing-in"} render={() => <SingIn />} />
      <Route path={"/sing-up"} render={() => <SingUp />} />

      <Route path={"/new-article"}>
        {isAuthenticated ? <ArticlesCreating /> : <Redirect to={"/sing-in"} />}
      </Route>

      <Route path="/articles/:slug/edit">
        {isAuthenticated ? <ArticlesCreating /> : <Redirect to={"/sing-in"} />}
      </Route>

      <Route exact={true} path="/articles/:slug">
        {!hasError ? <ArticleExpanded /> : null}
      </Route>

      <Route exact={true} path={["/articles", "/"]}>
        {!hasError ? <ArticlesList /> : articleErrorNotification()}
      </Route>

      <Route exact path={["/articles", "/"]}>
        {!hasError ? <PaginationArticles /> : null}
      </Route>
    </div>
  );
};

export default Main;
