import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillMount() {
    this.props.signoutUser();
    this.context.router.push('/');
  }

  render() {
    return (<div id="page-wrapper">
              <div className="container-fluid">
                  <div>Sorry to see you go...</div>
              </div>
            </div>);
  }
}

export default connect(null, actions)(Signout);
