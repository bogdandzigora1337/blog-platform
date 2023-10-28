import React from "react";

import { Button } from "antd";

import cl from "./TagInput.module.scss";

import InputField from "../../../Form/InputField/InputField";

interface ITagInputProps {
  fields: { id: string }[];
  register: any;
  remove: (index: number) => void;
  errors: any;
  append: any;
}

const TagInput: React.FC<ITagInputProps> = ({
  fields,
  register,
  remove,
  errors,
  append,
}) => {
  const renderTagInput = (tag: any, index: number) => {
    const hasError = errors?.tagList && errors.tagList[index];
    return (
      <div key={index} className={cl["article-creating__tags__input"]}>
        <InputField
          type="text"
          name={`tagList.${index}.name`}
          register={register}
          errors={errors}
          placeholder={"Tag"}
          minLength={3}
          maxLength={10}
        />
        <Button
          className={cl["article-creating__tags__btn--delete-tag"]}
          onClick={() => remove(index)}
          style={{
            borderColor: "1px solid var(--success-color, #F5222D)",
            color: "var(--success-color, #F5222D)",
          }}
        >
          Delete
        </Button>
        {hasError && (
          <p className={cl["error-text"]}>
            {errors.tagList[index]?.name?.message}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className={cl["article-creating__tags"]}>
      <label>Tags</label>
      <div className={cl["article-creating__tags__container"]}>
        <div className={cl["article-creating__tags__list"]}>
          {fields.map((tag, index) => renderTagInput(tag, index))}
        </div>

        {!errors?.tagList && (
          <Button
            className={cl["article-creating__tags__btn--add-tag"]}
            style={{
              borderColor: "1px solid var(--success-color, #1890FF)",
              color: "var(--success-color, #1890FF)",
            }}
            onClick={() => append({ name: "" })}
          >
            Add tag
          </Button>
        )}
      </div>
    </div>
  );
};

export default TagInput;
