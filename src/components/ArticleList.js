import ArticlePreview from './ArticlePreview'
import ListPagination from './ListPagination'
import React from 'react'

const ArticleList = props => {
  if (!props.articles) {
    return (
      <div className="article-preview">Loading...</div>
    )
  }

  if (props.articles.length === 0) {
    return (
      <div className="article-preview">
        No articles are here... yet.
      </div>
    )
  }

  return (
    <div className='list-group'>
      <div className="pad row">
        <div className='col-sm-5'></div>
        <div className='col-sm-1'><h3><small>Impact</small></h3></div>
        <div className='col-sm-1'><h3><small>Ease</small></h3></div>
        <div className='col-sm-1' style={{ paddingLeft: '0' }}><h3><small>Confidence</small></h3></div>
        <div className='col-sm-1'><h3><small>Avg</small></h3></div>
        <div className='col-sm-3'></div>
      </div>
      {
        props.articles.map(article => {
          return (
            <ArticlePreview article={article} key={article.slug} />
          )
        })
      }

      <ListPagination
        pager={props.pager}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage} />
    </div>
  )
}

export default ArticleList
