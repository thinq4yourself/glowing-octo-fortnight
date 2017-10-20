import ListErrors from './ListErrors'
import React from 'react'
import agent from '../agent'
import { connect } from 'react-redux'
import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  LOGOUT
} from '../constants/actionTypes'

class SettingsForm extends React.Component {
  constructor() {
    super()

    this.state = {
      image: '',
      name: '',
      bio: '',
      email: '',
      password: ''
    }

    this.updateState = field => ev => {
      const state = this.state
      const newState = Object.assign({}, state, { [field]: ev.target.value })
      this.setState(newState)
    }

    this.submitForm = ev => {
      ev.preventDefault()

      const user = Object.assign({}, this.state)
      if (!user.password) {
        delete user.password
      }

      this.props.onSubmitForm(user)
    }
  }

  componentWillMount() {
    if (this.props.currentUser) {
      Object.assign(this.state, {
        image: this.props.currentUser.avatar_url || '',
        name: this.props.currentUser.name,
        email: this.props.currentUser.email
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState(Object.assign({}, this.state, {
        image: nextProps.currentUser.avatar_url || '',
        name: nextProps.currentUser.name,
        email: nextProps.currentUser.email
      }))
    }
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <fieldset>

          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="URL of profile picture"
              value={this.state.avatar_url}
              onChange={this.updateState('image')} />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Name"
              value={this.state.name}
              onChange={this.updateState('name')} />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.updateState('email')} />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="New Password"
              value={this.state.password}
              onChange={this.updateState('password')} />
          </fieldset>

          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={this.state.inProgress}>
            Update Profile
          </button>

        </fieldset>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
  onSubmitForm: user =>
    dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) }),
  onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED })
})

class Settings extends React.Component {
  render() {
    return (
      <div className="settings-page">
        <div className="container-fluid page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">

              <h1 className="text-xs-center">Your Settings</h1>

              <ListErrors errors={this.props.errors}></ListErrors>

              <SettingsForm
                currentUser={this.props.currentUser}
                onSubmitForm={this.props.onSubmitForm} />

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
