import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

let componentJustMount = null;

class Signin extends Component {

  componentWillMount() {
    componentJustMount = true;
  }

  handleFormSubmit({email, password}) {

    // {email, password} - {email: email, password: password}
    this.props.signinUser({email, password});
  }
  renderAlert() {
    if (this.props.errorMessage && !componentJustMount) {
      return (
        <div className="alert alert-danger">
          <strong>Oops! </strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  render() {

    const { handleSubmit, fields: {email, password}} = this.props;

    return (
      <div id="page-wrapper">
          <div className="container-fluid">
              <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                  <label>Email:</label>
                  <input {...email} className="form-control" />
                </fieldset>
                <fieldset className="form-group">
                  <label>Password:</label>
                  <input {...password} type="password" className="form-control" />
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign in</button>
              </form>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (componentJustMount) {
    componentJustMount = false;
    return {};
  } else {
    return { errorMessage: state.auth.authError };
  }
}

// just like connect
export default reduxForm({
    form: 'signin',
    fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);
