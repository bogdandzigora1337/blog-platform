import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import uniqId from "uniqid";

import cl from "./ArticleHeaderLeftContent.module.scss";

import { toggleArticleLikeAPI } from "../../../../../../redux/actions/likeAction";
import { truncateText } from "../../Article";
import { IconLikesActive, IconLikesNotActive } from "./IconLikes";
import { ArticleDataType, UserStateType } from "../../../../../../types/types";

interface IArticleHeaderProps {
  item: ArticleDataType;
}

const ArticleHeaderLeftContent: React.FC<IArticleHeaderProps> = ({ item }) => {
  const dispatch = useDispatch<any>();

  const userToken = useSelector(
    (state: UserStateType) => state.logToAccountReducer.data?.user?.token
  );

  const handleLikeClick = () => {
    if (userToken) {
      dispatch(toggleArticleLikeAPI(item.slug, userToken, !item.favorited));
    }
  };

  const renderTags = () => {
    if (!item.tagList.length) {
      return <span key={uniqId()}>no tags</span>;
    }

    return item.tagList.map((tag) => {
      if (typeof tag === "string") {
        return tag.trim() && tag.length ? (
          <span key={uniqId()}>{truncateText(tag, 10)}</span>
        ) : (
          <span key={uniqId()}>no tags</span>
        );
      } else if (typeof tag === "object" && "name" in tag) {
        return tag.name.trim() && tag.name.length ? (
          <span key={uniqId()}>{truncateText(tag.name, 10)}</span>
        ) : (
          <span key={uniqId()}>no tags</span>
        );
      }
      return null;
    });
  };

  const renderLikeButton = () => {
    return (
      <span
        className={cl["article-header__left-content__likes__svg"]}
        onClick={handleLikeClick}
      >
        {userToken ? (
          item.favorited ? (
            <IconLikesActive />
          ) : (
            <IconLikesNotActive />
          )
        ) : (
          <IconLikesNotActive />
        )}
      </span>
    );
  };

  return (
    <div className={cl["article-header__left-content"]}>
      <div className={cl["article-header__left-content__container"]}>
        <Link
          to={`/articles/${item.slug}`}
          className={cl["article-header__left-content__title"]}
        >
          {truncateText(item.title, 20)}
        </Link>

        <span className={cl["article-header__left-content__likes"]}>
          {renderLikeButton()}
          {<span>{item.favoritesCount}</span>}
        </span>
      </div>
      <div className={cl["article-header__left-content__tags"]}>
        {renderTags()}
      </div>
    </div>
  );
};

export default ArticleHeaderLeftContent;
