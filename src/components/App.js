import agent from '../agent'
import Header from './Header'
import React from 'react'
import { connect } from 'react-redux'
import { APP_LOAD, REDIRECT, LOGOUT } from '../constants/actionTypes'
import { Route, Switch } from 'react-router-dom'
import Article from '../components/Article'
import Editor from '../components/Editor'
import Home from '../components/Home'
import Login from '../components/Login'
import Profile from '../components/Profile'
import ProfileFavorites from '../components/ProfileFavorites'
import Register from '../components/Register'
import Settings from '../components/Settings'
import { store } from '../store'
import { push } from 'react-router-redux'
import { Link } from 'react-router-dom'
import './App.css'

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }}

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
})

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo)
      store.dispatch(push(nextProps.redirectTo))
      this.props.onRedirect()
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt')
    if (token) {
      agent.setToken(token)
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token)
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div className='container-fluid'>
          <div className='row'>
            <nav className='col-sm-3 col-md-2 left-sidebar'>
              <div className='center-block sidebar-logo'>
                <img src='/images/logo.svg' className="sidebar-avatar" alt={this.props.currentUser.username} />
                <br />
                <Link
                  to='/home'
                  className="nav-link center-block">
                  The Idea Pool
                </Link>
              </div>
              <div className='center-block'>
                <Link
                  to={`/@${this.props.currentUser.username}`}
                  className="nav-link center-block">
                  <img src={this.props.currentUser.image} className="sidebar-avatar" alt={this.props.currentUser.username} />
                </Link><br />
                <Link
                  to={`/@${this.props.currentUser.username}`}
                  className="nav-link center-block">
                  {this.props.currentUser.username}
                </Link><br /><br />
                <button
                  onClick={this.props.onClickLogout}
                  className="btn btn-outline-success">
                  Logout
                </button>
              </div>
            </nav>
            <div className='col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main'>
              <div>
                <Header
                  appName={this.props.appName}
                  currentUser={this.props.currentUser} />
                  <Switch>
                  <Route exact path='/' component={Register}/>
                  <Route exact path='/home' component={Home}/>
                  <Route path='/login' component={Login} />
                  <Route path='/register' component={Register} />
                  <Route path='/editor/:slug' component={Editor} />
                  <Route path='/editor' component={Editor} />
                  <Route path='/article/:id' component={Article} />
                  <Route path='/settings' component={Settings} />
                  <Route path='/@:username/favorites' component={ProfileFavorites} />
                  <Route path='/@:username' component={Profile} />
                  </Switch>
              </div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser} />
      </div>
    )
  }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// }

export default connect(mapStateToProps, mapDispatchToProps)(App)
