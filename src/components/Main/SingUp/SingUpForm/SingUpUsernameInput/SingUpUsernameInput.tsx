import React from 'react'
import { useFormContext } from 'react-hook-form'

import cl from '../SingUpForm.module.scss'
import InputField from '../../../Form/InputField/InputField'
import { RegUserStateType, RegUserFormType } from '../../../../../types/types'

interface IErrorInputPropsType {
  error: RegUserStateType['registrationReducer']['error']
}

const SingUpUsernameInput: React.FC<IErrorInputPropsType> = ({ error }) => {
  const { register, formState } = useFormContext<RegUserFormType>()
  const { errors } = formState

  const usernameError = error && typeof error === 'object' && error.errors.username

  return (
    <>
      <div className={cl['sing-up__item']}>
        <InputField
          label="Username"
          type="text"
          name="username"
          register={register}
          errors={errors}
          serverRequestError={usernameError}
          placeholder="Username"
          pattern={{
            value: /^[a-z0-9]+$/,
            message: 'login can only consist of small letters and numbers',
          }}
          minLength={3}
          maxLength={20}
        />
        {usernameError && <p className={cl['error-text']}>{error.errors.username}</p>}
      </div>
    </>
  )
}

export default SingUpUsernameInput
