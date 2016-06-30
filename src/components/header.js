import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {

  renderBasedOnAuthentication() {
    if (this.props.authenticated) {
      return [
        <ul key={1} className="nav navbar-right top-nav">
            <li key={1.1}><Link to="/download" className="navbar-brand"><i className="fa fa-cloud-download" aria-hidden="true"></i> Download App</Link></li>
            <li key={1.2}><Link to="/devices" className="navbar-brand"><i className="fa fa-plug" aria-hidden="true"></i> Devices</Link></li>
            <li key={1.3} className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-user"></i> {localStorage.getItem('email')} <b className="caret"></b></a>
                <ul className="dropdown-menu">
                    <li key={1.4}>
                        <Link to="/signout"><i className="fa fa-fw fa-power-off"></i> Log Out</Link>
                    </li>
                </ul>
            </li>
        </ul>
      ];
    }
  }

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
              </button>
              <Link to="/devices" className="navbar-brand"><img src="images/logo.png" width="250px" height="30px" alt="Smart Power Socket logo"></img></Link>
          </div>
          {this.renderBasedOnAuthentication()}
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
