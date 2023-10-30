import React from 'react'
import { Link } from 'react-router-dom'

import cl from './ProfileEditAccessMessage.module.scss'

const ProfileEditAccessMessage: React.FC = () => {
  const renderLoginMessage = () => (
    <p className={cl['login-notification']}>
      Log in to your account to edit your profile
      <Link to="/sing-in" className={cl['account-exists__link']}>
        Sign In.
      </Link>
    </p>
  )

  return renderLoginMessage()
}

export default ProfileEditAccessMessage
