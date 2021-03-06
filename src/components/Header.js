import React from 'react'
import { Link } from 'react-router-dom'

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul className='nav navbar-nav pull-xs-right'>

        <li className='nav-item'>
          <Link to='/home' className='nav-link'>
            Home
          </Link>
        </li>

        <li className='nav-item'>
          <Link to='/login' className='nav-link'>
            Sign in
          </Link>
        </li>

        <li className='nav-item'>
          <Link to='/register' className='nav-link'>
            Sign up
          </Link>
        </li>

      </ul>
    )
  }
  return null
}

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <ul className='nav navbar-nav pull-xs-right'>
        <li className='nav-item'>
          <Link to='/editor' className='nav-link add-idea'>
          <img src='/images/add.png' alt='Add idea' />
          </Link>
        </li>
      </ul>
    )
  }

  return null
}

class Header extends React.Component {
  render() {
    return (
      <nav className='navbar navbar-light' style={{ borderBottom: '1px solid #efefef' }}>
        <div className='container-fluid'>

          <Link to='/home' className='navbar-brand'>
            {this.props.appName}
          </Link>

          <LoggedOutView currentUser={this.props.currentUser} />

          <LoggedInView currentUser={this.props.currentUser} />
        </div>
      </nav>
    )
  }
}

export default Header
