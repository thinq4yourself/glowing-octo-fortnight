import React from 'react'
import { Link } from 'react-router-dom'
import agent from '../agent'
import { connect } from 'react-redux'
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../constants/actionTypes'
import ArticleActions from './Article/ArticleActions'

const FAVORITED_CLASS = 'btn btn-sm btn-primary'
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary'

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: ARTICLE_FAVORITED,
    payload: agent.Articles.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: ARTICLE_UNFAVORITED,
    payload: agent.Articles.unfavorite(slug)
  })
})

const ArticlePreview = props => {
  const article = props.article
  const favoriteButtonClass = article.favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS

  const handleClick = ev => {
    ev.preventDefault()
    if (article.favorited) {
      props.unfavorite(article.slug)
    } else {
      props.favorite(article.slug)
    }
  }
  
  return (
    <div className="list-group-item" style={{ border: '0' }}>
      <div className="pad row">
      <div className='col-sm-5'>
          <Link to={`/editor/${article.slug}`} className="preview-link">
            <h3><small>{article.title}</small></h3>
          </Link>
        </div>
        <div className='col-sm-1'>
          <p>{article.description}</p>
        </div>
        <div className='col-sm-1'>
          <p>{new Date(article.createdAt).toDateString()}</p>
        </div>
        <div className='col-sm-1'>
          <p>{article.slug}</p>
        </div>
        <div className='col-sm-1'>
            <p>{article.title}</p>
          </div>
        <div className='col-sm-3'>
          <ArticleActions canModify="true" article={article} />
        </div>
      </div>
    </div>
  )
}

export default connect(() => ({}), mapDispatchToProps)(ArticlePreview)
