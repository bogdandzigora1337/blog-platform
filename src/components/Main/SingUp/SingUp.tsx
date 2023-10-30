import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { message } from 'antd'

import { clearRegUserDataAction } from '../../../redux/actions/authActions'
import { RegUserStateType } from '../../../types/types'

import cl from './SingUp.module.scss'
import { SingUpForm } from './SingUpForm/SingUpForm'
import SingUpLogNotice from './SingUpLogNotice/SingUpLogNotice'
import SingUpSuccessfulRegNotification from './SingUpSuccessfulRegNotification/SingUpSuccessfulRegNotification'

export const SingUp: React.FC = () => {
  const dispatch = useDispatch<any>()
  const history = useHistory()
  const [messageApi, contextHolder] = message.useMessage()

  const logFailed = useSelector((state: RegUserStateType) => state.registrationReducer.error)

  const logFailedMessage = () => {
    messageApi.open({
      type: 'error',
      content: 'Log error, server side',
    })
  }

  let previousPath = history.location.pathname
  history.listen((location, action) => {
    if (action === 'PUSH' && previousPath === '/sing-up' && location.pathname !== '/sing-up') {
      dispatch(clearRegUserDataAction())
    }
    previousPath = location.pathname
  })

  const regUserData = useSelector((state: RegUserStateType) => state.registrationReducer.data)

  useEffect(() => {
    if (typeof logFailed === 'string') {
      logFailedMessage()
    }
  }, [logFailed])

  return (
    <div className={cl['sing-up']}>
      {contextHolder}
      <h1 className={cl['sing-up__title']}>Create new account</h1>
      {regUserData ? (
        <SingUpSuccessfulRegNotification />
      ) : (
        <>
          <SingUpForm />
          <SingUpLogNotice />
        </>
      )}
    </div>
  )
}
