import { useDispatch, useSelector } from "react-redux";

import { Pagination, ConfigProvider } from "antd";

import cl from "./PaginationArticle.module.scss";

import { currentArticlesPage, getArticles } from "../../../redux/actions";

type CurrentPageType = {
  articlesReducer: {
    currentPage: number;
    data: {
      articlesCount: number;
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

const PaginationArticles: React.FC = () => {
  const dispatch = useDispatch<any>();

  const currentPage = useSelector(
    (state: CurrentPageType) => state.articlesReducer.currentPage
  );
  const userToken = useSelector(
    (state: UserTokenType) => state.logToAccountReducer.data?.user?.token
  );
  const totalPages = useSelector((state: CurrentPageType) =>
    Math.ceil(state.articlesReducer.data?.articlesCount / 5)
  );

  return (
    <div className={cl["pagination-articles"]}>
      {totalPages ? (
        <ConfigProvider
          theme={{
            components: {
              Pagination: {
                itemActiveBg: "#1890FF",
              },
            },
            token: {
              colorPrimary: "ffffff",
            },
          }}
        >
          <Pagination
            className={cl["pagination"]}
            total={totalPages * 10}
            current={currentPage}
            showSizeChanger={false}
            onChange={(page) => {
              dispatch(currentArticlesPage(page));
              dispatch(getArticles(5, 5 * page - 5, userToken));
            }}
          />
        </ConfigProvider>
      ) : null}
    </div>
  );
};

export default PaginationArticles;
