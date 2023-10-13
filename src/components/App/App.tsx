import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getArticles } from "../../redux/actions";

import { BrowserRouter as Router } from "react-router-dom";

import cl from "./App.module.scss";

import Header from "../Header/Header";
import Main from "../Main/Main";

const App: React.FC = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getArticles());
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
