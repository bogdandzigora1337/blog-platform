import { useDispatch, useSelector } from "react-redux";

import { Pagination, ConfigProvider } from "antd";

import cl from "./PaginationArticle.module.scss";

import { currentArticlesPage, getArticles } from "../../../redux/actions";

type CurrentPageType = {
  articlesReducer: {
    currentPage: number;
  };
};

type NumberPagesType = {
  articlesReducer: {
    data: {
      articlesCount: number;
    };
  };
};

const PaginationArticles: React.FC = () => {
  const currentPage = useSelector(
    (state: CurrentPageType) => state.articlesReducer.currentPage
  );

  const numberPages = useSelector((state: NumberPagesType) =>
    Math.ceil(state.articlesReducer.data.articlesCount / 5)
  );

  const dispatch = useDispatch<any>();

  return numberPages ? (
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
        className={cl["main__pagination"]}
        total={numberPages * 10}
        current={currentPage}
        showSizeChanger={false}
        onChange={(page) => {
          dispatch(currentArticlesPage(page));
          dispatch(getArticles(5, 5 * page - 5));
        }}
      />
    </ConfigProvider>
  ) : null;
};

export default PaginationArticles;
