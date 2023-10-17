import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";

import { format } from "date-fns";
import uniqId from "uniqid";

import cl from "./Article.module.scss";

import { IconLikes } from "./IconLikes";

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

const truncateText = (text: string, sumSymbol: number): string => {
  if (text.length > sumSymbol) {
    return (text.slice(0, sumSymbol) + "...").trim();
  }
  return text.trim();
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
          {item.author.username}
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
          item.tagList.map((tag) => (
            <span key={uniqId()}>{truncateText(tag, 10)}</span>
          ))
        ) : (
          <>
            <span>no tags</span>
          </>
        )}
      </div>
    </div>
  );
};

const ArticleDescription = ({ item }: { item: ArticleDataType }) => {
  return (
    <div className={cl["articles-list__item__description"]}>
      {item.description}
    </div>
  );
};
