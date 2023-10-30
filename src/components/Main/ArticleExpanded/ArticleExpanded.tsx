import React from 'react'
import { useParams } from 'react-router-dom'
import Markdown from 'react-markdown'
import { useSelector } from 'react-redux'

import { ArticlesStateType } from '../../../types/types'
import { Article } from '../ArticlesList/Article/Article'

import cl from './ArticleExpanded.module.scss'

interface IArticleExpandedProps {
  slug: string
}

export const ArticleExpanded: React.FC = () => {
  const { slug } = useParams<IArticleExpandedProps>()

  const articles = useSelector((state: ArticlesStateType) => state.articlesReducer.data?.articles || [])

  const article = articles.find((item) => item.slug === slug)

  if (!article) {
    return (
      <div className={cl['article-missing']}>
        <p>Статья не найдена</p>
      </div>
    )
  }

  return (
    <ul className={cl['article-expanded']}>
      <Article item={article}>
        <Markdown className={cl['article-markdown']}>{article.body}</Markdown>
      </Article>
    </ul>
  )
}
