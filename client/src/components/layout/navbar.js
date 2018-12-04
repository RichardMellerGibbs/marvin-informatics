import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/cms">
            CMS
          </Link>
        </li>
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        {/* <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li> */}
      </ul>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img
                className="nav-logo"
                src={require('../../img/m.png')}
                alt="company logo"
              />
              Marvin Informatics
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#collapsingNavbarSm"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="collapsingNavbarSm">
              <ul className="navbar-nav ml-auto">
                {/* <li className="nav-item"> 
                  <Link className="nav-link" to="/services">
                    Services
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/customers">
                    Our Customers
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/partner">
                    Partners
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About Us
                  </Link>
                </li>
                {isAuthenticated ? authLinks : guestLinks}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
