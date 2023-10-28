import React from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";

import cl from "./ArticleHeaderRightContent.module.scss";

import { ArticleDataType, UserStateType } from "../../../../../../types/types";

type IArticleHeaderProps = {
  item: ArticleDataType;
};

export const ArticleHeaderRightContent: React.FC<IArticleHeaderProps> = ({
  item,
}) => {
  const usernameActive = useSelector(
    (state: UserStateType) => state.logToAccountReducer.data?.user?.username
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
