import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { changeUserData, clearChangeUserDataErrAction } from '../../../../redux/actions/authActions'
import InputField from '../../Form/InputField/InputField'
import { UserStateType } from '../../../../types/types'

import cl from './ProfileEditingForm.module.scss'

type FormData = {
  [key: string]: string
}

interface IProfileEditingFormProps {
  userToken: string
  userData: UserStateType['logToAccountReducer']['data']
  editingError: UserStateType['logToAccountReducer']['editingError']
}

const ProfileEditingForm: React.FC<IProfileEditingFormProps> = ({ userToken, userData, editingError }) => {
  const dispatch = useDispatch<any>()

  const removeEmptyValues = (obj: FormData) => {
    for (const key in obj) {
      if (obj[key] === '') {
        delete obj[key]
      }
    }
    return obj
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: 'onChange' })

  const onSubmit = (data: FormData) => {
    const wrapperData = {
      token: userToken,
      user: { ...removeEmptyValues(data) },
    }
    dispatch(changeUserData(wrapperData))
  }

  const isAnyFieldFilled = Object.values(watch()).some((elem) => elem)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cl['edit-profile__item']}>
        <InputField
          isRequired={false}
          label="Username"
          type="text"
          name="username"
          register={register}
          errors={errors}
          placeholder={`${userData?.user?.username}`}
          maxLength={20}
          minLength={3}
          pattern={{
            value: /^[a-z0-9]+$/,
            message: 'login can only consist of small letters and numbers',
          }}
        />
        {typeof editingError === 'object' && editingError?.errors && (
          <p className={cl['error-text']}>{editingError.errors.username}</p>
        )}
      </div>

      <div className={cl['edit-profile__item']}>
        <InputField
          isRequired={false}
          label="Email address"
          type="email"
          name="email"
          register={register}
          errors={errors}
          placeholder={`${userData?.user?.email}`}
          validate={(value: string) => {
            if (value) {
              if (!/^\S+@\S+$/i.test(value)) {
                return 'The email address must contain the @ symbol'
              }
              if (!/^[a-z0-9.@]+$/.test(value)) {
                return 'Email should be in lowercase'
              }
            }
            return true
          }}
        />
        {typeof editingError === 'object' && editingError?.errors && (
          <p className={cl['error-text']}>{editingError.errors.email}</p>
        )}
      </div>

      <div className={cl['edit-profile__item']}>
        <InputField
          isRequired={false}
          label="New password"
          type="password"
          name="password"
          register={register}
          errors={errors}
          placeholder={'Password'}
          minLength={6}
          maxLength={40}
        />
      </div>

      <div className={cl['edit-profile__item']}>
        <InputField
          isRequired={false}
          label="Avatar image (url)"
          type="url"
          placeholder="Avatar image"
          register={register}
          name="image"
          errors={errors}
        />
      </div>

      <input
        type="submit"
        value={'Save'}
        className={cl['edit-profile__save']}
        disabled={!isValid || !isAnyFieldFilled}
        onClick={() => dispatch(clearChangeUserDataErrAction())}
      />
    </form>
  )
}

export default ProfileEditingForm
