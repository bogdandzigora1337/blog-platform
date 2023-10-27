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

type FormData = {
  title: string;
  description: string;
  body: string;
  tagList?: Tag[];
};

type Tag = {
  name: string;
};

type CurrentPageType = {
  articlesReducer: {
    currentPage: number;
  };
};

interface ArticleFormProps {
  isNewArticlePage: boolean;
  currentArticle?: ArticleType;
  creationMessage: any;
  currentSlug: string;
}

type ArticleType = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[] | [];
};

export type UserTokenType = {
  logToAccountReducer: {
    data: {
      user: {
        token: string | null | undefined;
      };
    };
  };
};

export const ArticleCreatingForm: React.FC<ArticleFormProps> = ({
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
  } = useForm<FormData>({ mode: "onChange" });

  const history = useHistory();
  const dispatch = useDispatch<any>();
  const currentPage = useSelector(
    (state: CurrentPageType) => state.articlesReducer.currentPage
  );

  const userToken = useSelector(
    (state: UserTokenType) => state.logToAccountReducer.data?.user?.token
  );

  const onSubmit = async (data: FormData) => {
    const arrayTags = data.tagList ? data.tagList.map((elem) => elem.name) : [];

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

  const { fields, append, remove } = useFieldArray<FormData>({
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
        append({ name: tag });
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
