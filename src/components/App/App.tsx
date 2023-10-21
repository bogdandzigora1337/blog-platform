import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getArticles } from "../../redux/actions";

import { BrowserRouter as Router } from "react-router-dom";

import cl from "./App.module.scss";

import Header from "../Header/Header";
import Main from "../Main/Main";

type CurrentPageType = {
  articlesReducer: {
    currentPage: number;
  };
};

const App: React.FC = () => {
  const dispatch = useDispatch<any>();
  const currentPage = useSelector(
    (state: CurrentPageType) => state.articlesReducer.currentPage
  );

  useEffect(() => {
    dispatch(getArticles(5, 5 * currentPage - 5));
  }, [dispatch]);

  return (
    <Router>
      <div className={cl["app"]}>
        <Header />
        <Main />
      </div>
    </Router>
  );
};

export default App;
