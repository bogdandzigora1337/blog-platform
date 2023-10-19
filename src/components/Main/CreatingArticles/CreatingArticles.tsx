import React from "react";

import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";

import cl from "./CreatingArticles.module.scss";

import { createArticle } from "../../../redux/actions";

type FormData = {
  title: string;
  description: string;
  body: string;
};

type UserTokenType = {
  logToAccountReducer: {
    data: {
      user: {
        token: string;
      };
    };
  };
};

export const ArticlesCreating: React.FC = () => {
  const userToken = useSelector(
    (state: UserTokenType) => state.logToAccountReducer.data.user.token
  );
  const dispatch = useDispatch<any>();

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    const wrapperData = {
      token: userToken,
      data: {
        article: { ...data, tags: ["tag"] },
      },
    };
    dispatch(createArticle(wrapperData));
  };

  return (
    <div className={cl["article-creating"]}>
      <h1 className={cl["article-creating__title"]}>Create new article</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cl["article-creating__form__item"]}>
          <label>Title</label>
          <input {...register("title")} type="text" placeholder="Title" />
        </div>
        <div className={cl["article-creating__form__item"]}>
          <label>Short description</label>
          <input
            {...register("description")}
            type="text"
            placeholder="Description"
          />
        </div>
        <div className={cl["article-creating__form__item"]}>
          <label>Text</label>
          <textarea
            className={cl["article-creating__form__textarea"]}
            {...register("body")}
            placeholder="Text"
          />
        </div>
        <input
          className={cl["article-creating__form__send"]}
          type="submit"
          value={"Send"}
        />
      </form>
    </div>
  );
};
