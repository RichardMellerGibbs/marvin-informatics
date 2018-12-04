import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { resetPassword } from '../../actions/authActions';

class Reset extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
      token: '',
      passwordReset: false,
      displayError: true
    };
  }

  //frontend route is
  //http://localhost:3000/reset/7d9b834c87544501d85ed6e8dc8a52d8689277fc
  //But live will not use this so maybe build for live and then it should say
  //http://localhost:5000/reset/7d9b834c87544501d85ed6e8dc8a52d8689277fc
  componentDidMount() {
    const { token } = this.props.match.params;
    this.setState({ token: token });
    //console.log('token in reset controller is ', token);
  }

  //Where to go following password reset - login
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors, displayError: true });
    }

    if (nextProps.auth.passwordReset) {
      this.setState({
        passwordReset: nextProps.auth.passwordReset
      });
    }
  }

  //reacts to user input
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.resetPassword(userData, this.state.token);
    this.setState({ displayError: false });
  };

  clearError = e => {
    e.preventDefault();
    this.setState({ displayError: false });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Reset Password</h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                </div>
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4 submit-button"
                />
                {this.state.passwordReset &&
                  !errors.reset && (
                    <div className="alert alert-success warningPanel">
                      <a className="close" data-dismiss="alert">
                        &times;
                      </a>
                      Your password has been reset. You can now login
                    </div>
                  )}
                {errors.reset &&
                  this.state.displayError && (
                    <div className="alert alert-danger">
                      <a className="close" onClick={this.clearError}>
                        &times;
                      </a>
                      {errors.reset}
                    </div>
                  )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Reset.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { resetPassword }
)(Reset);
