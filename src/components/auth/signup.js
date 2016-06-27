import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

let componentJustMount = null;

class Signup extends Component {

  componentWillMount() {
    componentJustMount = true;
  }

  handleFormSubmit(formProps) {
    // Call action creator to sign up user (properties with no errors)
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage && !componentJustMount) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {

    const { handleSubmit, fields: { email, password, passwordConfirm}} = this.props;

    return (
      <div id="page-wrapper">
          <div className="container-fluid">
              <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                  <label>Email:</label>
                  <input className="form-control" {...email} />
                  {email.touched && email.error && <div className="error">{email.error}</div>}
                </fieldset>
                <fieldset className="form-group">
                  <label>Password:</label>
                  <input className="form-control" {...password} type="password" />
                  {/*if the two are true, output the last (this is tricky JS)*/}
                  {password.touched && password.error && <div className="error">{password.error}</div>}
                </fieldset>
                <fieldset className="form-group">
                  <label>Confirm Password:</label>
                  <input className="form-control" {...passwordConfirm} type="password" />
                  {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign up!</button>
              </form>
          </div>
      </div>
    );
  }
}

function validEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Calls this function on any action on the form (click the field, type, etc..)
function validate(formProps) {
  const errors = {};

  if (!formProps.email){
    errors.email = "Please enter an email";
  }

  if (formProps.email && !validEmail(formProps.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!formProps.password) {
    errors.password = "Please enter a password";
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = "Please enter a password confirmation";
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = "Password must match";
  }

  return errors;
}

function mapStateToProps(state) {
  if (componentJustMount) {
    componentJustMount = false;
    return {};
  } else {
    return { errorMessage: state.auth.registrationError };
  }
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate // ES6 - Value and key with same name
}, mapStateToProps, actions)(Signup);
