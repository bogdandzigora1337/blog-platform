import React from "react";

import cl from "./InputField.module.scss";

interface InputFieldProps {
  label?: string;
  type: string;
  name: string;
  register: any;
  errors?: any;
  placeholder: string;
  className?: string;
  minLength?: number;
  maxLength?: number;
  isTextarea?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  register,
  errors,
  placeholder,
  minLength,
  maxLength,
  isTextarea,
}) => (
  <>
    {label && <label>{label}</label>}
    {isTextarea ? (
      <textarea
        className={errors[name] && cl["input-error"]}
        {...register(name, {
          required: "This field is required",
          minLength: {
            value: minLength,
            message: `Minimum ${minLength} characters`,
          },
          maxLength: {
            value: maxLength,
            message: `Minimum ${maxLength} characters`,
          },
        })}
        placeholder={placeholder}
      />
    ) : (
      <input
        className={errors[name] && cl["input-error"]}
        {...register(name, {
          required: "This field is required",
          minLength: {
            value: minLength,
            message: `Minimum ${minLength} characters`,
          },
          maxLength: {
            value: maxLength,
            message: `Minimum ${maxLength} characters`,
          },
        })}
        type={type}
        placeholder={placeholder}
      />
    )}
    {!!errors[name] && (
      <p className={cl["error-text"]}>{errors[name]?.message || "Error"}</p>
    )}
  </>
);

export default InputField;
