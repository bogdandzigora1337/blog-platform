import React from 'react'
import { Link } from 'react-router-dom'

import cl from './SingUpLogNotice.module.scss'

const SingUpLogNotice: React.FC = () => {
  return (
    <p className={cl['sing-up__account-exists']}>
      Already have an account?
      <Link to="/sing-in" className={cl['sing-up__account-exists__link']}>
        Sign In.
      </Link>
    </p>
  )
}

export default SingUpLogNotice
