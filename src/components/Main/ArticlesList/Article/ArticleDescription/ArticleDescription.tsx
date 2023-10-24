import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Button, Popconfirm } from "antd";

import cl from "./ArticleDescription.module.scss";

import "../ArticleAntd.scss";
import { articleDelete } from "../../../../../redux/actions";
import { useDispatch } from "react-redux";
import { getArticles } from "../../../../../redux/actions";

type ArticleDataType = RootState["articlesReducer"]["data"]["articles"][0];

export type RootState = {
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
type CurrentPageType = {
  articlesReducer: {
    currentPage: number;
  };
};
type UsernameType = {
  logToAccountReducer: {
    data: {
      user?: {
        username: string;
      };
    };
  };
};
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

export const ArticleDescription = ({ item }: { item: ArticleDataType }) => {
  const dispatch = useDispatch<any>();

  const currentPage = useSelector(
    (state: CurrentPageType) => state.articlesReducer.currentPage
  );

  const usernameActive = useSelector(
    (state: UsernameType) => state.logToAccountReducer.data?.user?.username
  );
  let isUserArticle: boolean = usernameActive === item.author.username;

  const userToken = useSelector(
    (state: UserTokenType) => state.logToAccountReducer.data?.user?.token
  );

  return (
    <>
      <div className={"articles-list__item__description"}>
        <p className={"articles-list__item__description__text"}>
          {item.description}
        </p>
        {isUserArticle && (
          <div className={cl["articles-list__item__description__buttons"]}>
            <Popconfirm
              placement="rightTop"
              title={"text"}
              description={"Are you sure to delete this article?"}
              onConfirm={() => {
                userToken && dispatch(articleDelete(userToken, item.slug));
                setTimeout(() => {
                  dispatch(getArticles(5, 5 * currentPage - 5, userToken));
                }, 300);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button>Delete</Button>
            </Popconfirm>

            <Link
              to={`/articles/${item.slug}/edit`}
              className={cl["articles-list__item__header__left-content__title"]}
            >
              <Button>Edit</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
