import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getArticles } from "../../redux/actions";

import cl from "./App.module.scss";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";

const App: React.FC = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  return (
    <div className={cl["app"]}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
