import React from 'react'

import cl from './ArticlesList.module.scss'
import { ArticlesData } from './Article/Article'

export const ArticlesList: React.FC = () => {
  return (
    <ul className={cl['main__articles-list']}>
      <ArticlesData />
    </ul>
  )
}
