import React from 'react'
import { Link } from 'react-router-dom'
import agent from '../agent'
import { connect } from 'react-redux'
import { IDEA_FAVORITED, IDEA_UNFAVORITED } from '../constants/actionTypes'
import IdeaActions from './Idea/IdeaActions'

const FAVORITED_CLASS = 'btn btn-sm btn-primary'
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary'

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: IDEA_FAVORITED,
    payload: agent.Ideas.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: IDEA_UNFAVORITED,
    payload: agent.Ideas.unfavorite(slug)
  })
})

const IdeaPreview = props => {
  const idea = props.idea
  const favoriteButtonClass = idea.favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS

  const handleClick = ev => {
    ev.preventDefault()
    if (idea.favorited) {
      props.unfavorite(idea.slug)
    } else {
      props.favorite(idea.slug)
    }
  }
  
  return (
    <div className="list-group-item" style={{ border: '0' }}>
      <div className="pad row">
      <div className='col-sm-5'>
          <Link to={`/editor/${idea.slug}`} className="preview-link">
            <h3><small>{idea.title}</small></h3>
          </Link>
        </div>
        <div className='col-sm-1'>
          <p>{idea.description}</p>
        </div>
        <div className='col-sm-1'>
          <p>{new Date(idea.createdAt).toDateString()}</p>
        </div>
        <div className='col-sm-1'>
          <p>{idea.slug}</p>
        </div>
        <div className='col-sm-1'>
            <p>{idea.title}</p>
          </div>
        <div className='col-sm-3'>
          <IdeaActions canModify="true" idea={idea} />
        </div>
      </div>
    </div>
  )
}

export default connect(() => ({}), mapDispatchToProps)(IdeaPreview)
