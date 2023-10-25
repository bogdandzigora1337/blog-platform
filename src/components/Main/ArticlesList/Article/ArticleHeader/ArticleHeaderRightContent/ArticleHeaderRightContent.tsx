import { format } from "date-fns";
import { useSelector } from "react-redux";
import cl from "./ArticleHeaderRightContent.module.scss";
import React from "react";

type ArticleType = ArticleDataType["articlesReducer"]["data"]["articles"][0];

type UserDataType = {
  logToAccountReducer: {
    data: {
      user: {
        token?: string;
        image?: string;
        email?: string;
        username?: string;
      } | null;
    } | null;
  };
};

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

export const ArticleHeaderRightContent: React.FC<ArticleHeaderProps> = ({
  item,
}) => {
  const usernameActive = useSelector(
    (state: UserDataType) => state.logToAccountReducer.data?.user?.username
  );
  let isUserArticle: boolean = usernameActive === item.author.username;

  const formattedDate = format(new Date(item.createdAt), "MMMM d, yyyy");
  const authorLabel = isUserArticle
    ? `${item.author.username} (You)`
    : item.author.username;

  return (
    <div className={cl["article-header__right-content"]}>
      <div className={cl["article-header__right-content__container"]}>
        <h6 className={cl["article-header__right-content__username-author"]}>
          {authorLabel}
        </h6>
        <p className={cl["article-header__right-content__created-at"]}>
          {formattedDate}
        </p>
      </div>
      <div className={cl["article-header__right-content__avatar"]}>
        <img src={item.author.image} alt="no-image" />
      </div>
    </div>
  );
};
