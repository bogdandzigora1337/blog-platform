import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import uniqId from "uniqid";

import { toggleArticleLikeAPI } from "../../../../../../redux/actions";
import { truncateText } from "../../Article";
import { IconLikesActive, IconLikesNotActive } from "../../IconLikes";

import cl from "./ArticleHeaderLeftContent.module.scss";

type ArticleDataType = RootState["articlesReducer"]["data"]["articles"][0];

type UserTokenType = {
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

export const ArticleHeaderLeftContent = ({
  item,
}: {
  item: ArticleDataType;
}) => {
  const dispatch = useDispatch<any>();

  const userToken = useSelector(
    (state: UserTokenType) => state.logToAccountReducer.data?.user?.token
  );

  return (
    <div className={cl["articles-list__item__header__left-content"]}>
      <div
        className={cl["articles-list__item__header__left-content__container"]}
      >
        <Link
          to={`/articles/${item.slug}`}
          className={cl["articles-list__item__header__left-content__title"]}
        >
          {truncateText(item.title, 20)}
        </Link>

        <div className={cl["articles-list__item__header__left-content__likes"]}>
          {
            <div
              onClick={() => {
                console.log(item.favorited);

                userToken &&
                  dispatch(
                    toggleArticleLikeAPI(item.slug, userToken, !item.favorited)
                  );
              }}
            >
              {userToken && item.favorited ? (
                <IconLikesActive />
              ) : (
                <IconLikesNotActive />
              )}
            </div>
          }
          {<span>{item.favoritesCount}</span>}
        </div>
      </div>
      <div className={cl["articles-list__item__header__left-content__tags"]}>
        {!!item.tagList.length ? (
          item.tagList.map((tag) => {
            return tag && !!tag.length ? (
              <span key={uniqId()}>{truncateText(tag, 10)}</span>
            ) : (
              <span key={uniqId()}>no tags</span>
            );
          })
        ) : (
          <>
            <span key={uniqId()}>no tags</span>
          </>
        )}
      </div>
    </div>
  );
};
