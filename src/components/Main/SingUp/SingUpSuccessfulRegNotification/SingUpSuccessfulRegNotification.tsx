import React from 'react'
import { Link } from 'react-router-dom'

import cl from './SingUpSuccessfulRegNotification.module.scss'
import { IconSvg } from './IconSvg'

const SingUpSuccessfulRegNotification: React.FC = () => {
  return (
    <div className={cl['success-notification']}>
      <p>
        <span>{<IconSvg />}</span> Registration completed successfully <br /> Login to your account{' '}
        <Link to="/sing-in">Sign In.</Link>
      </p>
    </div>
  )
}

export default SingUpSuccessfulRegNotification
