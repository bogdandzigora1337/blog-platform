import { Progress } from "antd";
import { useSelector } from "react-redux";

import cl from "./LoaderArticles.module.scss";

type PercentLoadType = {
  articlesReducer: {
    percentLoader: number;
  };
};

const LoaderArticles: React.FC = () => {
  const colorsLoader = { "0%": "#f3f7fa", "100%": "#2196f3" };

  const percentLoad = useSelector(
    (state: PercentLoadType) => state.articlesReducer.percentLoader
  );

  return (
    <div className={cl["header__loader"]}>
      <Progress
        percent={percentLoad}
        strokeColor={colorsLoader}
        showInfo={false}
        trailColor={"transparent"}
      />
    </div>
  );
};

export default LoaderArticles;
