import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import uniqId from "uniqid";

import cl from "./ArticleHeaderLeftContent.module.scss";

import { toggleArticleLikeAPI } from "../../../../../../redux/actions";
import { truncateText } from "../../Article";
import { IconLikesActive, IconLikesNotActive } from "./IconLikes";

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

const ArticleHeaderLeftContent: React.FC<ArticleHeaderProps> = ({ item }) => {
  const dispatch = useDispatch<any>();

  const userToken = useSelector(
    (state: UserDataType) => state.logToAccountReducer.data?.user?.token
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

    return item.tagList.map((tag: string) => {
      return tag && tag.length ? (
        <span key={uniqId()}>{truncateText(tag, 10)}</span>
      ) : (
        <span key={uniqId()}>no tags</span>
      );
    });
  };

  const renderLikeButton = () => {
    if (userToken) {
      return (
        <span
          className={cl["article-header__left-content__likes__svg"]}
          onClick={handleLikeClick}
        >
          {item.favorited ? <IconLikesActive /> : <IconLikesNotActive />}
        </span>
      );
    }
    return null;
  };

  return (
    <div className={cl["article-header__left-content"]}>
      <div className={cl["article-header__left-content__container"]}>
        <Link
          to={`/articles/${item.slug}`}
          className={cl["article-header__left-content__title"]}
        >
          {truncateText(item.title, 50)}
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
