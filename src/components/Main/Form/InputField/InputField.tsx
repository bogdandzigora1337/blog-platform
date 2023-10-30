import React from 'react'

import cl from './InputField.module.scss'

interface InputFieldProps {
  label?: string
  type: string
  name: string
  register: Function
  errors?: any
  placeholder: string
  className?: string
  minLength?: number
  maxLength?: number
  isTextarea?: boolean
  pattern?: any
  validate?: any
  isRequired?: boolean
  serverRequestError?: false | string | null
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
  pattern,
  validate,
  isRequired,
  serverRequestError,
}) => (
  <>
    {label && <label>{label}</label>}
    {isTextarea ? (
      <textarea
        className={(errors[name] || serverRequestError) && cl['input-error']}
        {...register(name, {
          validate: validate,
          pattern: pattern,
          required: isRequired === undefined ? 'This field is required' : false,
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
        className={(errors[name] || serverRequestError) && cl['input-error']}
        {...register(name, {
          required: isRequired === undefined ? 'This field is required' : false,
          validate: validate,
          pattern: pattern,
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
    {!!errors[name] && <p className={cl['error-text']}>{errors[name]?.message || 'Error'}</p>}
  </>
)

export default InputField
