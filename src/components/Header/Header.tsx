import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { currentArticlesPage, getArticles } from '../../redux/actions/articleActions'
import { UserStateType } from '../../types/types'

import cl from './Header.module.scss'
import AuthProfile from './AuthProfile/AuthProfile'
import LoaderArticles from './LoaderArticles/LoaderArticles'
import { UserProfileHeader } from './UserProfileHeader/UserProfileHeader'

const Header: React.FC = () => {
  const dispatch = useDispatch<any>()

  const userToken = useSelector((state: UserStateType) => state.logToAccountReducer.data?.user?.token)

  const logInUserDetails = useSelector((state: UserStateType) => state.logToAccountReducer.data)

  return (
    <header className={cl['header']}>
      <div className={cl['header__container']}>
        <Link
          to={'/articles/'}
          className={cl['header__title']}
          onClick={() => {
            dispatch(currentArticlesPage(1))
            dispatch(getArticles(5, 0, userToken))
          }}
        >
          <p>Realworld Blog</p>
        </Link>
        {logInUserDetails ? <UserProfileHeader /> : <AuthProfile />}
      </div>
      <LoaderArticles />
    </header>
  )
}

export default Header
