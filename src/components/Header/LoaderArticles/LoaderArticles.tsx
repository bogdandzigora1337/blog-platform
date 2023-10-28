import React from "react";
import { Progress } from "antd";
import { useSelector } from "react-redux";

import styles from "./LoaderArticles.module.scss";

import { ArticlesStateType } from "../../../types/types";

const LoaderArticles: React.FC = () => {
  const loaderColors = { "0%": "#f3f7fa", "100%": "#2196f3" };

  const isLoading = useSelector(
    (state: ArticlesStateType) => state.articlesReducer.loader
  );
  const percentLoad = useSelector(
    (state: ArticlesStateType) => state.articlesReducer.percentLoader
  );

  return (
    <div className={styles.loader}>
      {isLoading && (
        <Progress
          percent={percentLoad}
          strokeColor={loaderColors}
          showInfo={false}
          status="active"
          trailColor={"transparent"}
        />
      )}
    </div>
  );
};

export default LoaderArticles;
