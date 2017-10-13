import IdeaActions from './IdeaActions'
import { Link } from 'react-router-dom'
import React from 'react'

const IdeaMeta = props => {
  const idea = props.idea
  return (
    <div className="idea-meta">
      <Link to={`/@${idea.author.name}`}>
        <img src={idea.author.image ? idea.author.image : 'https://static.productionready.io/images/smiley-cyrus.jpg'} alt={idea.author.name} />
      </Link>

      <div className="info">
        <Link to={`/@${idea.author.name}`} className="author">
          {idea.author.name}
        </Link>
        <span className="date">
          {new Date(idea.createdAt).toDateString()}
        </span>
      </div>

      <IdeaActions canModify={props.canModify} idea={idea} />
    </div>
  )
}

export default IdeaMeta
