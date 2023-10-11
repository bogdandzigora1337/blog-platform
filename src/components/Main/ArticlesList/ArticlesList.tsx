import cl from "./ArticlesList.module.scss";

import { Article } from "./Article/Article";

export const ArticlesList: React.FC = () => {
  return (
    <ul className={cl["main__articles-list"]}>
      <Article />
    </ul>
  );
};
