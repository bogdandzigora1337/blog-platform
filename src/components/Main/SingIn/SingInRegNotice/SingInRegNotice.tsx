import React from 'react'
import { Link } from 'react-router-dom'

import cl from './SingInRegNotice.module.scss'

const SingInRegNotice: React.FC = () => {
  return (
    <p className={cl['sing-in__account-log']}>
      Don’t have an account?
      <Link to="/sing-up" className={cl['sing-in__account-log__link']}>
        Sign Up.
      </Link>
    </p>
  )
}

export default SingInRegNotice
