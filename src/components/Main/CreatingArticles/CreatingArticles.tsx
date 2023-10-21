import React from "react";

import { useForm, useFieldArray } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import uniqId from "uniqid";

import cl from "./CreatingArticles.module.scss";

import { createArticle } from "../../../redux/actions";

type FormData = {
  title: string;
  description: string;
  body: string;
  tagList?: Tag[];
};

type Tag = {
  name: string;
};

export type UserTokenType = {
  logToAccountReducer: {
    data: {
      user: {
        token: string;
      };
    };
  };
};

type ArticleType = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[] | [];
};

type currentArticlesType = {
  articlesReducer: {
    data: {
      articles: ArticleType[];
    };
  };
};

export const ArticlesCreating: React.FC = () => {
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const isNewArticlePage: boolean = location.pathname === "/new-article";

  const pathParts = location.pathname.split("/");
  const currentSlug = pathParts[pathParts.length - 2];

  const currentArticles = useSelector(
    (state: currentArticlesType) => state.articlesReducer.data.articles
  );

  const currentArticle: ArticleType | undefined = currentArticles.find(
    (elem) => elem.slug === currentSlug
  );

  const userToken = useSelector(
    (state: UserTokenType) => state.logToAccountReducer.data.user.token
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    clearErrors,
  } = useForm<FormData>({ mode: "onBlur" });

  const { fields, append, prepend, remove } = useFieldArray<FormData>({
    name: "tagList",
    control,
  });

  const onSubmit = (data: FormData) => {
    const arrayTags = data.tagList ? data.tagList.map((elem) => elem.name) : [];

    const wrapperData = {
      token: userToken,
      slug: currentSlug,
      data: {
        article: { ...data, tagList: arrayTags },
      },
    };

    dispatch(createArticle(wrapperData, isNewArticlePage ? "POST" : "PUT"));
  };

  useEffect(() => {
    if (isNewArticlePage) {
      setValue("title", "");
      setValue("description", "");
      setValue("body", "");
      clearErrors("tagList");
      remove();
    } else {
      setValue("title", currentArticle?.title || "");
      setValue("description", currentArticle?.description || "");
      setValue("body", currentArticle?.body || "");

      remove();
      (currentArticle?.tagList || []).forEach((tag) => {
        append({ name: tag });
      });
    }
  }, [isNewArticlePage, currentArticle, setValue, append]);

  return (
    <div className={cl["article-creating"]}>
      <h1 className={cl["article-creating__title"]}>
        {isNewArticlePage ? "Create new article" : "Edit article"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cl["article-creating__form__item"]}>
          <label>Title</label>
          <input
            className={errors?.title && cl["input-error"]}
            {...register("title", {
              required: "This field is required",
              minLength: { value: 3, message: "Minimum 3 characters" },
              maxLength: { value: 20, message: "Maximum 20 characters" },
            })}
            type="text"
            placeholder="Title"
          />
          {errors?.title && (
            <p className={cl["error-text"]}>
              {errors?.title?.message || "Error"}
            </p>
          )}
        </div>

        <div className={cl["article-creating__form__item"]}>
          <label>Short description</label>
          <input
            className={errors?.description && cl["input-error"]}
            {...register("description", {
              required: "This field is required",
              minLength: { value: 4, message: "Minimum 4 characters" },
              maxLength: { value: 60, message: "Maximum 60 characters" },
            })}
            type="text"
            placeholder="Description"
          />
          {errors?.description && (
            <p className={cl["error-text"]}>
              {errors?.description?.message || "Error"}
            </p>
          )}
        </div>

        <div className={cl["article-creating__form__item"]}>
          <label>Text</label>
          <textarea
            className={`${cl["article-creating__form__textarea"]} ${
              errors?.body && cl["input-error"]
            }`}
            {...register("body", {
              required: "This field is required",
              minLength: { value: 10, message: "Minimum 10 characters" },
              maxLength: { value: 5000, message: "Maximum 5000 characters" },
            })}
            placeholder="Text"
          />
          {errors?.body && (
            <p className={cl["error-text"]}>
              {errors?.body?.message || "Error"}
            </p>
          )}
        </div>

        <div className={cl["article-creating__form__item__tags"]}>
          <label className={cl["article-creating__form__item__tags__title"]}>
            Tags
          </label>

          <div className={cl["article-creating__form__item__tags__container"]}>
            <div
              className={
                cl["article-creating__form__item__tags__container__list"]
              }
            >
              {fields.map((tag, index) => (
                <div
                  key={uniqId()}
                  className={cl["article-creating__form__item__tags__input"]}
                >
                  <input
                    type="text"
                    {...register(`tagList.${index}.name`, {
                      required: "Заполните поле",
                      minLength: {
                        value: 3,
                        message: "Minimum 3 characters",
                      },
                      maxLength: {
                        value: 10,
                        message: "Maximum 10 characters",
                      },
                    })}
                    placeholder="Tag"
                  />
                  <Button
                    className={
                      cl["article-creating__form__item__tags__btn--delete-tag"]
                    }
                    onClick={() => remove(index)}
                    style={{
                      borderColor: "1px solid #F5222D",
                      color: "#F5222D",
                    }}
                  >
                    Delete
                  </Button>
                  {errors?.tagList && errors.tagList[index] && (
                    <p className={cl["error-text"]}>
                      {errors.tagList[index]?.name?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <Button
              style={{
                borderColor: "1px solid  #1890FF",
                color: "#1890FF",
              }}
              onClick={() => append({ name: "" })}
            >
              Add Tag
            </Button>
          </div>
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
