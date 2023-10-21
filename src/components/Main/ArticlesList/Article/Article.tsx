import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { format } from "date-fns";
import uniqId from "uniqid";
import { Button, Popconfirm, message } from "antd";
import useMessage from "antd/es/message/useMessage";

import cl from "./Article.module.scss";

import { IconLikes } from "./IconLikes";
import { UserTokenType } from "../../CreatingArticles/CreatingArticles";
import { articleDelete } from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import { getArticles } from "../../../../redux/actions";

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

type ArticleDataType = RootState["articlesReducer"]["data"]["articles"][0];

type UsernameType = {
  logToAccountReducer: {
    data: {
      user?: {
        username: string;
      };
    };
  };
};

type CurrentPageType = {
  articlesReducer: {
    currentPage: number;
  };
};

const truncateText = (text: string, sumSymbol: number): string => {
  if (typeof text === "string" && text.length > sumSymbol) {
    return (text.slice(0, sumSymbol) + "...").trim();
  }
  return text;
};

export const ArticlesData: React.FC = () => {
  const articles = useSelector(
    (state: RootState) => state.articlesReducer.data.articles
  );

  const getArticle =
    articles &&
    articles.map((item) => {
      return <Article item={item} key={uniqId()} />;
    });

  return <>{getArticle}</>;
};

export const Article = ({
  item,
  children,
}: {
  item: ArticleDataType;
  children?: React.ReactNode;
}) => {
  return (
    <li className={cl["articles-list__item"]}>
      <ArticleHeader item={item}></ArticleHeader>
      <ArticleDescription item={item}></ArticleDescription>
      {children}
    </li>
  );
};

const ArticleHeader = ({ item }: { item: ArticleDataType }) => {
  return (
    <div className={cl["articles-list__item__header"]}>
      <ArticleHeaderLeftContent item={item} />
      <ArticleHeaderRightContent item={item} />
    </div>
  );
};

const ArticleHeaderRightContent = ({ item }: { item: ArticleDataType }) => {
  const usernameActive = useSelector(
    (state: UsernameType) => state.logToAccountReducer.data?.user?.username
  );

  let isUserArticle: boolean = usernameActive === item.author.username;

  return (
    <div className={cl["articles-list__item__header__right-content"]}>
      <div
        className={cl["articles-list__item__header__right-content__container"]}
      >
        <h6
          className={
            cl["articles-list__item__header__right-content__username-author"]
          }
        >
          {isUserArticle
            ? `${item.author.username} (You)`
            : item.author.username}
        </h6>
        <p
          className={
            cl["articles-list__item__header__right-content__createdAt"]
          }
        >
          {format(new Date(item.createdAt), "MMMM d, yyyy")}
        </p>
      </div>

      <img src={item.author.image} alt="no-image" />
    </div>
  );
};

const ArticleHeaderLeftContent = ({ item }: { item: ArticleDataType }) => {
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
          {<div>{<IconLikes />}</div>}
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

const ArticleDescription = ({ item }: { item: ArticleDataType }) => {
  const dispatch = useDispatch<any>();

  const currentPage = useSelector(
    (state: CurrentPageType) => state.articlesReducer.currentPage
  );

  const usernameActive = useSelector(
    (state: UsernameType) => state.logToAccountReducer.data?.user?.username
  );
  let isUserArticle: boolean = usernameActive === item.author.username;

  const userToken = useSelector(
    (state: UserTokenType) => state.logToAccountReducer.data?.user.token
  );

  return (
    <>
      <div className={cl["articles-list__item__description"]}>
        <p className={cl["articles-list__item__description__text"]}>
          {item.description}
        </p>
        {isUserArticle && (
          <div className={cl["articles-list__item__description__buttons"]}>
            <Popconfirm
              placement="rightTop"
              title={"text"}
              description={"Are you sure to delete this article?"}
              onConfirm={() => {
                dispatch(articleDelete(userToken, item.slug));
                setTimeout(() => {
                  dispatch(getArticles(5, 5 * currentPage - 5));
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
