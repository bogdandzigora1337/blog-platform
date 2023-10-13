import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import { useSelector } from "react-redux";

import { RootState } from "../ArticlesList/Article/Article";

import { Article } from "../ArticlesList/Article/Article";

import cl from "./ArticleExpanded.module.scss";

export const ArticleExpanded: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const articles = useSelector(
    (state: RootState) => state.articlesReducer.data.articles
  );
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return <div>Статья не найдена</div>;
  }

  return (
    <ul className={cl["main__articles-expanded"]}>
      <Article item={article}>
        <Markdown className={cl["main__articles-markdown"]}>
          {article.body}
        </Markdown>
      </Article>
    </ul>
  );
};
