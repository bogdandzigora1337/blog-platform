import React from "react";
import { Progress } from "antd";
import { useSelector } from "react-redux";

import styles from "./LoaderArticles.module.scss";

interface LoaderArticlesProps {}

type PercentLoadType = {
  articlesReducer: {
    percentLoader?: number;
    loader?: boolean;
  };
};

const LoaderArticles: React.FC<LoaderArticlesProps> = () => {
  const loaderColors = { "0%": "#f3f7fa", "100%": "#2196f3" };

  const isLoading = useSelector(
    (state: PercentLoadType) => state.articlesReducer.loader
  );
  const percentLoad = useSelector(
    (state: PercentLoadType) => state.articlesReducer.percentLoader
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
