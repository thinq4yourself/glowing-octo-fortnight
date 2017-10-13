import { Link } from 'react-router-dom'
import ListErrors from './ListErrors'
import React from 'react'
import agent from '../agent'
import { connect } from 'react-redux'
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes'

const mapStateToProps = state => ({ ...state.auth })

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onChangeName: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'name', value }),
  onSubmit: (name, email, password) => {
    const payload = agent.Auth.register(name, email, password)
    dispatch({ type: REGISTER, payload })
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
})

class Register extends React.Component {
  constructor() {
    super()
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value)
    this.changePassword = ev => this.props.onChangePassword(ev.target.value)
    this.changeName = ev => this.props.onChangeName(ev.target.value)
    this.submitForm = (name, email, password) => ev => {
      ev.preventDefault()
      this.props.onSubmit(name, email, password)
    }
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {
    const email = this.props.email
    const password = this.props.password
    const name = this.props.name

    return (
      <div className="auth-page">
        <div className="container-fluid page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="/login">
                  Have an account?
                </Link>
              </p>

              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm(name, email, password)}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Name"
                      value={this.props.name}
                      onChange={this.changeName} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={this.props.email}
                      onChange={this.changeEmail} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={this.props.password}
                      onChange={this.changePassword} />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Sign up
                  </button>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
