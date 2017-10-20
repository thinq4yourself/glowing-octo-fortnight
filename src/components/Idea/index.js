import IdeaMeta from './IdeaMeta'
import CommentContainer from './CommentContainer'
import React from 'react'
import agent from '../../agent'
import { connect } from 'react-redux'
import marked from 'marked'
import { IDEA_PAGE_LOADED, IDEA_PAGE_UNLOADED } from '../../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.idea,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: IDEA_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: IDEA_PAGE_UNLOADED })
})

class Idea extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Ideas.get(this.props.match.params.id),
      agent.Comments.forIdea(this.props.match.params.id)
    ]))
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {
    if (!this.props.idea) {
      return null
    }

    const markup = { __html: marked(this.props.idea.body, { sanitize: true }) }
    const canModify = this.props.currentUser &&
      this.props.currentUser.name === this.props.idea.author.name
    return (
      <div className="idea-page">

        <div className=" jumbotron">
          <div className="container-fluid">

            <h1>{this.props.idea.title}</h1>
            <IdeaMeta
              idea={this.props.idea}
              canModify={canModify} />

          </div>
        </div>

        <div className="page">

          <div className="idea-content">
            <div className="">

              <p dangerouslySetInnerHTML={markup}></p>

              <ul className="tag-list">
                {
                  this.props.idea.tagList.map(tag => {
                    return (
                      <li
                        className="tag-default tag-pill tag-outline"
                        key={tag}>
                        {tag}
                      </li>
                    )
                  })
                }
              </ul>

            </div>
          </div>

          <hr />

          <div className="idea-actions">
          </div>

          <div className="">
            <CommentContainer
              comments={this.props.comments || []}
              errors={this.props.commentErrors}
              slug={this.props.match.params.id}
              currentUser={this.props.currentUser} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Idea)
