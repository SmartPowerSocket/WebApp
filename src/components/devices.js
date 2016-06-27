import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';

class Devices extends Component {

  componentWillMount() {
    this.props.getDevices();
  }

  renderDevicesList() {
    let devices = this.props.devices;

    if (devices && devices.length > 0) {

      return(<div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th>Status</th>
              <th>Internal Id</th>
              <th>Name</th>
              <th>Device Id</th>
              <th>Claim Date</th>
            </tr>
          </thead>
          <tbody>
          {devices.map(function(device) {
            return (<tr key={device._id}>
              <td>{device.state.status && device.state.status == "Active" ?
                <i className="fa fa-bolt" style={{fontSize: '20px', color: 'orange'}}></i> :
                <i className="fa fa-bolt" style={{fontSize: '20px', color: 'black'}}></i> } {device.state.status}</td>
              <td><Link to={`/device?id=${device._id}`}>{device._id}</Link></td>
              <td>{device.photonName}</td>
              <td>{device.photonId}</td>
              <td>{device.claimDate}</td>
            </tr>);
          })}
          </tbody>
        </table>
      </div>);

    } else if (devices && devices.length === 0) {
      return (<div><span>No devices</span></div>);
    } else {
      return (<div><span>Loading...</span></div>);
    }
  }

  render() {
    return (
          <div className="container-fluid">
              <div className="row">
                  <div className="col-lg-12">
                      <br />
                      <div className="panel panel-default">
                          <div className="panel-heading">
                              <h3 className="panel-title"><i className="fa fa-power-off fa-fw"></i> Devices Panel</h3>
                          </div>
                          <div className="panel-body">
                              {this.renderDevicesList()}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      devices: state.devices.list
    };
}

export default connect(mapStateToProps, actions)(Devices);
