import React, { Component } from 'react';
import classnames from 'classnames';

class cmsOverview extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      displayError: true
    };
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="cms">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Maintain Content</h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                {this.state.forgotPasswordSent &&
                  !errors.forgot && (
                    <div className="alert alert-success warningPanel">
                      <a className="close" data-dismiss="alert">
                        &times;
                      </a>
                      An email has been sent to your mailbox containing further
                      instructions
                    </div>
                  )}

                {errors.forgot &&
                  this.state.displayError && (
                    <div className="alert alert-danger">
                      <a className="close" onClick={this.clearError}>
                        &times;
                      </a>
                      {errors.forgot}
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

export default cmsOverview;
