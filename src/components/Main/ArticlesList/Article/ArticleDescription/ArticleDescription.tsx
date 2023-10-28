import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Button, Popconfirm } from "antd";

import cl from "./ArticleDescription.module.scss";

import "../ArticleAntd.scss";
import { articleDelete } from "../../../../../redux/actions/articleActions";
import { getArticles } from "../../../../../redux/actions/articleActions";
import { truncateText } from "../Article";
import {
  ArticleDataType,
  ArticlesStateType,
  UserStateType,
} from "../../../../../types/types";

interface IArticleHeaderProps {
  item: ArticleDataType;
}

const ArticleDescription: React.FC<IArticleHeaderProps> = ({ item }) => {
  const dispatch = useDispatch<any>();

  const currentPage = useSelector(
    (state: ArticlesStateType) => state.articlesReducer.currentPage
  );

  const usernameActive = useSelector(
    (state: UserStateType) => state.logToAccountReducer.data?.user?.username
  );
  let isUserArticle: boolean = usernameActive === item.author.username;

  const userToken = useSelector(
    (state: UserStateType) => state.logToAccountReducer.data?.user?.token
  );

  return (
    <>
      <div className={cl["article-description"]}>
        <p className={cl["article-description__text"]}>
          {truncateText(item.description, 200)}
        </p>
        {isUserArticle && (
          <div className={cl["article-description__btn"]}>
            <Popconfirm
              className={cl["article-description__btn__delete"]}
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
              <Button
                style={{
                  borderColor: "1px solid var(--success-color, #F5222D)",
                  color: "var(--success-color, #F5222D)",
                }}
              >
                Delete
              </Button>
            </Popconfirm>

            <Link
              to={`/articles/${item.slug}/edit`}
              className={cl["article-description__btn__edit"]}
            >
              <Button
                style={{
                  borderColor: "1px solid var(--success-color, #52C41A)",
                  color: "var(--success-color, #52C41A)",
                }}
              >
                Edit
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default ArticleDescription;
