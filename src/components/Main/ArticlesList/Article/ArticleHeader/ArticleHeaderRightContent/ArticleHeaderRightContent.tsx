import { format } from "date-fns";
import { useSelector } from "react-redux";
import cl from "./ArticleHeaderRightContent.module.scss";

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

export const ArticleHeaderRightContent = ({
  item,
}: {
  item: ArticleDataType;
}) => {
  const usernameActive = useSelector(
    (state: UsernameType) => state.logToAccountReducer.data?.user?.username
  );

  let isUserArticle: boolean = usernameActive === item.author.username;

  return (
    <div className={"articles-list__item__header__right-content"}>
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
