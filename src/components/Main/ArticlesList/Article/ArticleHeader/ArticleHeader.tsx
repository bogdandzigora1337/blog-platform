import React from "react";

import cl from "./ArticleHeader.module.scss";

import ArticleHeaderLeftContent from "./ArticleHeaderLeftContent/ArticleHeaderLeftContent";
import { ArticleHeaderRightContent } from "./ArticleHeaderRightContent/ArticleHeaderRightContent";

type ArticleType = ArticleDataType["articlesReducer"]["data"]["articles"][0];

type ArticleDataType = {
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

type ArticleHeaderProps = {
  item: ArticleType;
};

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ item }) => {
  return (
    <div className={cl["article-header"]}>
      <ArticleHeaderLeftContent item={item} />
      <ArticleHeaderRightContent item={item} />
    </div>
  );
};

export default ArticleHeader;
