import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Space } from 'antd'

import styles from './AuthProfile.module.scss'

const AuthButton: React.FC<{
  to: string
  text: string
  color?: string
  borderColor?: string
}> = ({ to, text, color, borderColor }) => {
  return (
    <Link to={to}>
      <Button
        className={styles.authButton}
        style={{
          color,
          borderColor,
        }}
        type="link"
      >
        {text}
      </Button>
    </Link>
  )
}

const AuthProfile: React.FC = () => {
  return (
    <Space className={styles.authProfile}>
      <AuthButton to="/sing-in" text="Sign In" color="var(--heading-color, rgba(0, 0, 0, 0.85)" />
      <AuthButton
        to="/sing-up"
        text="Sign Up"
        borderColor="1px solid var(--success-color, #52C41A)"
        color="var(--success-color, #52C41A)"
      />
    </Space>
  )
}

export default AuthProfile
