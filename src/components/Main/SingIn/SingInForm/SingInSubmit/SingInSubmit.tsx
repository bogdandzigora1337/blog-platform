import React from 'react'
import { useDispatch } from 'react-redux'
import { useFormContext } from 'react-hook-form'

import { clearUserLoginErrorAction } from '../../../../../redux/actions/authActions'

import cl from './SingInSubmit.module.scss'

type FormDataType = {
  email: string
  password: string
}

const SingInSubmit: React.FC = () => {
  const dispatch = useDispatch<any>()

  const { formState } = useFormContext<FormDataType>()
  const { isValid } = formState

  return (
    <input
      type="submit"
      value={'Login'}
      className={cl['sing-in__log']}
      disabled={!isValid}
      onClick={() => dispatch(clearUserLoginErrorAction())}
    />
  )
}

export default SingInSubmit
