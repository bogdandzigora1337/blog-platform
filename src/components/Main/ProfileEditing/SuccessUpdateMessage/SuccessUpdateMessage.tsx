import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'antd'

import { IconProfile } from '../IconProfile'
import { clearChangeUserDataErrAction } from '../../../../redux/actions/authActions'

import cl from './SuccessUpdateMessage.module.scss'

const SuccessUpdateMessage: React.FC = () => {
  const dispatch = useDispatch<any>()

  const buttonStyles = {
    borderColor: '1px solid var(--success-color, #b7eb8f)',
    color: 'var(--success-color, #52c41a)',
  }

  return (
    <div className={cl['success-notification']}>
      <p>
        <span>{<IconProfile />}</span> Data has been successfully updated.
      </p>
      <Button onClick={() => dispatch(clearChangeUserDataErrAction())} style={buttonStyles}>
        Close notification
      </Button>
    </div>
  )
}

export default SuccessUpdateMessage
