import DeleteButton from './DeleteButton'
import { Link } from 'react-router-dom'
import React from 'react'

const Comment = props => {
  const comment = props.comment
  const show = props.currentUser &&
    props.currentUser.name === comment.author.name
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link
          to={`/@${comment.author.name}`}
          className="comment-author">
          <img src={comment.author.image} className="comment-author-img" alt={comment.author.name} />
        </Link>
        &nbsp
        <Link
          to={`/@${comment.author.name}`}
          className="comment-author">
          {comment.author.name}
        </Link>
        <span className="date-posted">
          {new Date(comment.createdAt).toDateString()}
        </span>
        <DeleteButton show={show} slug={props.slug} commentId={comment.id} />
      </div>
    </div>
  )
}

export default Comment
