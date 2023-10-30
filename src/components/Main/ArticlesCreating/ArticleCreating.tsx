import React from 'react'
import { useLocation } from 'react-router-dom'
import { message } from 'antd'
import { useSelector } from 'react-redux'

import { ArticlesStateType } from '../../../types/types'

import cl from './CreatingArticles.module.scss'
import { ArticleCreatingForm } from './ArticleCreatingForm/ArticleCreatingForm'

type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading'

export const ArticlesCreating: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const creationMessage = (messageType: NoticeType, messageText: string) => {
    messageApi.open({
      type: messageType,
      content: messageText,
    })
  }

  const location = useLocation()
  const isNewArticlePage: boolean = location.pathname === '/new-article'
  const pathParts = location.pathname.split('/')
  const currentSlug = pathParts[pathParts.length - 2]

  const currentArticles = useSelector((state: ArticlesStateType) => state.articlesReducer.data?.articles)

  const currentArticle: ArticlesStateType['articlesReducer']['data']['articles'][number] | undefined =
    currentArticles && currentArticles.find((elem) => elem.slug === currentSlug)

  return (
    <div className={cl['article-creating']}>
      {contextHolder}

      <h1 className={cl['article-creating__title']}>{isNewArticlePage ? 'Create new article' : 'Edit article'}</h1>

      <ArticleCreatingForm
        isNewArticlePage={isNewArticlePage}
        currentArticle={currentArticle}
        creationMessage={creationMessage}
        currentSlug={currentSlug}
      />
    </div>
  )
}
