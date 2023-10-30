import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination, ConfigProvider } from 'antd'

import { currentArticlesPage, getArticles } from '../../../redux/actions/articleActions'
import { ArticlesStateType, UserStateType } from '../../../types/types'

import cl from './PaginationArticle.module.scss'

const PaginationArticles: React.FC = () => {
  const dispatch = useDispatch<any>()

  const currentPage = useSelector((state: ArticlesStateType) => state.articlesReducer.currentPage)
  const userToken = useSelector((state: UserStateType) => state.logToAccountReducer.data?.user?.token)
  const totalPages = useSelector((state: ArticlesStateType) => Math.ceil(state.articlesReducer.data?.articlesCount / 5))

  return (
    <div className={cl['pagination-articles']}>
      {totalPages ? (
        <ConfigProvider
          theme={{
            components: {
              Pagination: {
                itemActiveBg: '#1890FF',
              },
            },
            token: {
              colorPrimary: 'ffffff',
            },
          }}
        >
          <Pagination
            className={cl['pagination']}
            total={totalPages * 10}
            current={currentPage}
            showSizeChanger={false}
            onChange={(page) => {
              dispatch(currentArticlesPage(page))
              dispatch(getArticles(5, 5 * page - 5, userToken))
            }}
          />
        </ConfigProvider>
      ) : null}
    </div>
  )
}

export default PaginationArticles
