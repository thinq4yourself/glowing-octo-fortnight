import IdeaPreview from './IdeaPreview'
import ListPagination from './ListPagination'
import React from 'react'

const IdeaList = props => {
  if (!props.ideas) {
    return (
      <div className="idea-preview">Loading...</div>
    )
  }

  if (props.ideas.length === 0) {
    return (
      <div className="idea-preview">
        No ideas are here... yet.
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
        props.ideas.map(idea => {
          return (
            <IdeaPreview idea={idea} key={idea.slug} />
          )
        })
      }

      <ListPagination
        pager={props.pager}
        ideasCount={props.ideasCount}
        currentPage={props.currentPage} />
    </div>
  )
}

export default IdeaList
