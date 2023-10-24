import { ArticleHeaderLeftContent } from "./ArticleHeaderLeftContent/ArticleHeaderLeftContent";
import { ArticleHeaderRightContent } from "./ArticleHeaderRightContent/ArticleHeaderRightContent";

type ArticleDataType = RootState["articlesReducer"]["data"]["articles"][0];

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
export const ArticleHeader = ({ item }: { item: ArticleDataType }) => {
  return (
    <div className={"articles-list__item__header"}>
      <ArticleHeaderLeftContent item={item} />
      <ArticleHeaderRightContent item={item} />
    </div>
  );
};
