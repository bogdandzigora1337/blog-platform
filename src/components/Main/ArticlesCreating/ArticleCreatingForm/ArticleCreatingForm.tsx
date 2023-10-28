import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";

import { useHistory } from "react-router-dom";

import cl from "./ArticleCreatingForm.module.scss";

import { createArticle } from "../../../../redux/actions/articleActions";
import { currentArticlesPage } from "../../../../redux/actions/articleActions";
import { getArticles } from "../../../../redux/actions/articleActions";
import TagInput from "./TagInput/TagInput";
import InputField from "../../Form/InputField/InputField";
import {
  UserStateType,
  ArticlesStateType,
  ArticleDataType,
} from "../../../../types/types";

interface IArticleFormProps {
  isNewArticlePage: boolean;
  currentArticle?: ArticleDataType;
  creationMessage: any;
  currentSlug: string;
}

export const ArticleCreatingForm: React.FC<IArticleFormProps> = ({
  isNewArticlePage,
  currentArticle,
  creationMessage,
  currentSlug,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    setValue,
    clearErrors,
  } = useForm<ArticlesStateType["articlesReducer"]["data"]["articles"][number]>(
    { mode: "onChange" }
  );

  const history = useHistory();
  const dispatch = useDispatch<any>();
  const currentPage = useSelector(
    (state: ArticlesStateType) => state.articlesReducer.currentPage
  );

  const userToken = useSelector(
    (state: UserStateType) => state.logToAccountReducer.data?.user?.token
  );

  const onSubmit = async (
    data: ArticlesStateType["articlesReducer"]["data"]["articles"][number]
  ) => {
    const arrayTags = data.tagList
      ? Array.isArray(data.tagList)
        ? data.tagList.map((elem) =>
            typeof elem === "string" ? elem : elem.name
          )
        : [data.tagList]
      : [];

    const wrapperData = {
      token: userToken,
      slug: currentSlug,
      data: {
        article: { ...data, tagList: arrayTags },
      },
    };
    dispatch(
      createArticle(wrapperData, isNewArticlePage ? "POST" : "PUT")
    ).then((data: unknown) => {
      if (typeof data === "undefined") {
        creationMessage("error", "An error occurred on the server side");
      } else {
        creationMessage("success", "Request completed successfully");
        if (isNewArticlePage) {
          dispatch(currentArticlesPage(1));
          dispatch(getArticles(5, 0, userToken));
          setTimeout(() => {
            history.push("/articles");
          }, 1000);
        } else {
          dispatch(getArticles(5, 5 * currentPage - 5, userToken));
        }
      }
    });
  };

  const { fields, append, remove } = useFieldArray<
    ArticlesStateType["articlesReducer"]["data"]["articles"][number]
  >({
    name: "tagList",
    control,
  });

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
        if (typeof tag === "string") {
          append({ name: tag });
        } else if (typeof tag === "object" && "name" in tag) {
          append({ name: tag.name });
        }
      });
    }
  }, [isNewArticlePage, currentArticle, setValue, append, remove, clearErrors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cl["article-creating__form__item"]}>
        <InputField
          label={"Title"}
          type={"text"}
          name={"title"}
          register={register}
          errors={errors}
          placeholder="Title"
          minLength={3}
          maxLength={50}
        ></InputField>
      </div>

      <div className={cl["article-creating__form__item"]}>
        <InputField
          label={"Short description"}
          type={"text"}
          name={"description"}
          register={register}
          errors={errors}
          placeholder="Description"
          minLength={4}
          maxLength={100}
        ></InputField>
      </div>

      <div className={cl["article-creating__form__item"]}>
        <InputField
          label={"Text"}
          type={"text"}
          name={"body"}
          register={register}
          errors={errors}
          placeholder="Text"
          minLength={10}
          maxLength={7000}
          isTextarea={true}
        ></InputField>
      </div>

      <TagInput
        fields={fields}
        register={register}
        remove={remove}
        errors={errors}
        append={append}
      />

      <input
        className={cl["article-creating__form__send"]}
        type="submit"
        value={"Send"}
        disabled={!isValid}
      />
    </form>
  );
};
