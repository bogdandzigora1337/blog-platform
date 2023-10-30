import React from 'react'

import { ArticleDataType } from '../../../../../types/types'

import cl from './ArticleHeader.module.scss'
import ArticleHeaderLeftContent from './ArticleHeaderLeftContent/ArticleHeaderLeftContent'
import { ArticleHeaderRightContent } from './ArticleHeaderRightContent/ArticleHeaderRightContent'

type IArticleHeaderProps = {
  item: ArticleDataType
}

const ArticleHeader: React.FC<IArticleHeaderProps> = ({ item }) => {
  return (
    <div className={cl['article-header']}>
      <ArticleHeaderLeftContent item={item} />
      <ArticleHeaderRightContent item={item} />
    </div>
  )
}

export default ArticleHeader
