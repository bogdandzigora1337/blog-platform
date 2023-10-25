import React from "react";

import { Button } from "antd";

import cl from "./TagInput.module.scss";

import InputField from "../../../Form/InputField/InputField";

interface TagInputProps {
  fields: { id: string }[];
  register: any;
  remove: (index: number) => void;
  errors: any;
  append: any;
}

const TagInput: React.FC<TagInputProps> = ({
  fields,
  register,
  remove,
  errors,
  append,
}) => {
  const renderTagInput = (index: number) => (
    <div key={index} className={cl["article-creating__tags__input"]}>
      <InputField
        type="text"
        name={`tagList.${index}.name`}
        register={register}
        errors={errors}
        placeholder="Tag"
        minLength={3}
        maxLength={10}
      />
      <Button
        className={cl["article-creating__tags__btn--delete-tag"]}
        onClick={() => remove(index)}
      >
        Delete
      </Button>
      {errors?.tagList && errors.tagList[index] && (
        <p className={cl["error-text"]}>
          {errors.tagList[index]?.name?.message}
        </p>
      )}
    </div>
  );

  return (
    <div className={cl["article-creating__tags"]}>
      <label>Tags</label>
      {fields.map((tag, index) => renderTagInput(index))}
      <Button
        className={cl["article-creating__tags__btn--add-tag"]}
        style={{
          borderColor: "1px solid  #1890FF",
          color: "#1890FF",
        }}
        onClick={() => append({ name: "" })}
      >
        Add Tag
      </Button>
    </div>
  );
};

export default TagInput;

{
  /* <input
        type="text"
        {...register(`tagList.${index}.name`, {
          required: "This field is required",
          minLength: {
            value: 3,
            message: "Minimum 3 characters",
          },
          maxLength: {
            value: 10,
            message: "Maximum 10 characters",
          },
        })}
        placeholder="Тег"
      /> */
}
