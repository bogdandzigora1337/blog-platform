import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import { getArticles } from '../../redux/actions/articleActions'
import Header from '../Header/Header'
import Main from '../Main/Main'
import { ArticlesStateType, UserStateType } from '../../types/types'

import cl from './App.module.scss'

const App: React.FC = () => {
  const dispatch = useDispatch<any>()
  const currentPage = useSelector((state: ArticlesStateType) => state.articlesReducer.currentPage)

  const userToken = useSelector((state: UserStateType) => state.logToAccountReducer.data?.user?.token)

  useEffect(() => {
    dispatch(getArticles(5, 5 * currentPage - 5, userToken))
  }, [dispatch])

  return (
    <Router>
      <div className={cl['app']}>
        <Header />
        <Main />
      </div>
    </Router>
  )
}

export default App
