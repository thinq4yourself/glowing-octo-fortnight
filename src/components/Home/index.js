import Banner from './Banner'
import MainView from './MainView'
import React from 'react'
import agent from '../../agent'
import { connect } from 'react-redux'
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../constants/actionTypes'

const Promise = global.Promise

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
})

const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () =>
    dispatch({  type: HOME_PAGE_UNLOADED })
})

class Home extends React.Component {
  componentWillMount() {
    const tab = 'all'
    const ideasPromise = agent.Ideas.all

    this.props.onLoad(tab, ideasPromise, Promise.all([ideasPromise()]))
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {
    return (
      <div className="home-page">

        <Banner token={this.props.token} appName={this.props.appName} />

        <div className="container-fluid page">
          <div className="row">
            <MainView />
          </div>
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
