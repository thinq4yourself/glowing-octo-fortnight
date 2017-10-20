import IdeaList from './IdeaList'
import React from 'react'
import { Link } from 'react-router-dom'
import agent from '../agent'
import { connect } from 'react-redux'
import {
  FOLLOW_USER,
  UNFOLLOW_USER,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED
} from '../constants/actionTypes'

const EditProfileSettings = props => {
  if (props.isUser) {
    return (
      <Link
        to="/settings"
        className="btn btn-sm btn-outline-secondary action-btn">
        <i className="ion-gear-a"></i> Edit Profile Settings
      </Link>
    )
  }
  return null
}

const FollowUserButton = props => {
  if (props.isUser) {
    return null
  }

  let classes = 'btn btn-sm action-btn'
  if (props.user.following) {
    classes += ' btn-secondary'
  } else {
    classes += ' btn-outline-secondary'
  }

  const handleClick = ev => {
    ev.preventDefault()
    if (props.user.following) {
      props.unfollow(props.user.name)
    } else {
      props.follow(props.user.name)
    }
  }

  return (
    <button
      className={classes}
      onClick={handleClick}>
      <i className="ion-plus-round"></i>
      &nbsp
      {props.user.following ? 'Unfollow' : 'Follow'} {props.user.name}
    </button>
  )
}

const mapStateToProps = state => ({
  ...state.ideaList,
  currentUser: state.common.currentUser,
  profile: state.profile
})

const mapDispatchToProps = dispatch => ({
  onFollow: name => dispatch({
    type: FOLLOW_USER,
    payload: agent.Profile.follow(name)
  }),
  onLoad: payload => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
  onUnfollow: name => dispatch({
    type: UNFOLLOW_USER,
    payload: agent.Profile.unfollow(name)
  }),
  onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED })
})

class Profile extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Profile.get(this.props.match.params.name),
      agent.Ideas.byAuthor(this.props.match.params.name)
    ]))
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  renderTabs() {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link active"
            to={`/@${this.props.profile.name}`}>
            My Ideas
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            to={`/@${this.props.profile.name}/favorites`}>
            Favorited Ideas
          </Link>
        </li>
      </ul>
    )
  }

  render() {
    const profile = this.props.profile
    if (!profile) {
      return null
    }

    const isUser = this.props.currentUser &&
      this.props.profile.name === this.props.currentUser.name

    return (
      <div className="profile-page">

        <div className="user-info">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">

                <img src={profile.image} className="user-img" alt={profile.name} />
                <h4>{profile.name}</h4>
                <p>{profile.bio}</p>

                <EditProfileSettings isUser={isUser} />
                <FollowUserButton
                  isUser={isUser}
                  user={profile}
                  follow={this.props.onFollow}
                  unfollow={this.props.onUnfollow}
                  />

              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">

            <div className="col-xs-12 col-md-10 offset-md-1">

              <div className="ideas-toggle">
                {this.renderTabs()}
              </div>

              <IdeaList
                pager={this.props.pager}
                ideas={this.props.ideas}
                ideasCount={this.props.ideasCount}
                state={this.props.currentPage} />
            </div>

          </div>
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
export { Profile, mapStateToProps }
