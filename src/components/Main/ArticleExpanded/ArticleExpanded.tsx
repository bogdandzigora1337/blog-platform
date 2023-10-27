import React from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import { useSelector } from "react-redux";

import { Article } from "../ArticlesList/Article/Article";

import cl from "./ArticleExpanded.module.scss";

interface ArticleExpandedProps {
  slug: string;
}

type RootState = {
  articlesReducer: {
    data: {
      articles: {
        author: {
          username: string;
          image: string;
          following: boolean;
        };

        body: string;
        createdAt: string;
        description: string;
        favorited: boolean;
        favoritesCount: number;
        slug: string;
        tagList: string[];
        title: string;
        updatedAt: string;
      }[];
    };
  };
};

export const ArticleExpanded: React.FC = () => {
  const { slug } = useParams<ArticleExpandedProps>();

  const articles = useSelector(
    (state: RootState) => state.articlesReducer.data?.articles || []
  );

  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return (
      <div className={cl["article-missing"]}>
        <p>Статья не найдена</p>
      </div>
    );
  }

  return (
    <ul className={cl["article-expanded"]}>
      <Article item={article}>
        <Markdown className={cl["article-markdown"]}>{article.body}</Markdown>
      </Article>
    </ul>
  );
};
