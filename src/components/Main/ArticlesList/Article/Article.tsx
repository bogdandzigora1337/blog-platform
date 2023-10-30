import React from 'react'
import { useSelector } from 'react-redux'
import uniqId from 'uniqid'
import { Skeleton } from 'antd'

import { ArticlesStateType, ArticleDataType } from '../../../../types/types'

/* eslint-disable-next-line */
import cl from './Article.module.scss'
import './ArticleAntd.scss'

import ArticleHeader from './ArticleHeader/ArticleHeader'
import ArticleDescription from './ArticleDescription/ArticleDescription'

interface IArticleProps {
  item: ArticleDataType
  children?: React.ReactNode
}

export const truncateText = (text: string, maxSymbol: number): string => {
  if (typeof text === 'string' && text.length > maxSymbol) {
    return (text.slice(0, maxSymbol) + '...').trim()
  }
  return text
}

export const Article: React.FC<IArticleProps> = ({ item, children }) => {
  const isLoading = useSelector((state: ArticlesStateType) => state.articlesReducer.loader)

  return (
    <li className={cl['article-item']}>
      {isLoading ? (
        <div className="skeleton-wrapper">
          <Skeleton active paragraph={{ rows: 2 }} avatar />
        </div>
      ) : (
        <>
          <ArticleHeader item={item} />
          <ArticleDescription item={item} />
          {children}
        </>
      )}
    </li>
  )
}

export const ArticlesData: React.FC = () => {
  const articles = useSelector((state: ArticlesStateType) => state.articlesReducer.data?.articles)

  const renderedArticles = articles
    ? articles.map((item) => {
        return <Article item={item} key={uniqId()} />
      })
    : []

  return <>{renderedArticles}</>
}
