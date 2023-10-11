import React from "react";

import { Pagination, ConfigProvider } from "antd";

import cl from "./Main.module.scss";

import { ArticlesList } from "./ArticlesList/ArticlesList";

const Main: React.FC = () => {
  return (
    <div className={cl["main"]}>
      <ArticlesList />

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
          defaultCurrent={1}
          total={50}
        />
      </ConfigProvider>
    </div>
  );
};

export default Main;
