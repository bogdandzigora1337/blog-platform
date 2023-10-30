import React from 'react'
import { useFormContext } from 'react-hook-form'

import { RegUserFormType } from '../../../../../types/types'

import cl from './SingUpSubmit.module.scss'

const SingUpSubmit: React.FC = () => {
  const { formState } = useFormContext<RegUserFormType>()
  const { isValid } = formState
  return <input type="submit" value={'Create'} className={cl['sing-up__create']} disabled={!isValid} />
}

export default SingUpSubmit
