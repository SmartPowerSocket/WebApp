import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Welcome extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillMount() {
      if (this.props.authenticated) {
        this.context.router.push('/devices');
      }
  }

  render() {
    return (
      <div id="page-wrapper">

          <div className="container-fluid">

              <div className="row">
                  <div className="col-lg-12">
                      <h1 className="page-header text-center">
                          Welcome to Smart Power Socket
                      </h1>
                  </div>
              </div>

              <div className="row row-centered">
                  <div className="col-lg-12">
                      <div className="panel panel-primary">
                        <Link to="/signin">
                          <div className="panel-heading">
                              <div className="row">
                                  <div className="col-xs-12 text-center">
                                    <i className="fa fa-sign-in fa-5x"></i>
                                      <div className="huge">Login</div>
                                  </div>
                              </div>
                          </div>
                        </Link>
                      </div>
                  </div>
                  <div className="col-lg-12">
                      <div className="panel panel-green">
                        <Link to="/signup">
                          <div className="panel-heading">
                              <div className="row">
                                  <div className="col-xs-12 text-center">
                                    <i className="fa fa-pencil fa-5x"></i>
                                      <div className="huge">Register</div>
                                  </div>
                              </div>
                          </div>
                        </Link>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Welcome);
