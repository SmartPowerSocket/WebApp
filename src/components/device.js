import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import RTChart from 'react-rt-chart';
import TimerMixin from 'react-timer-mixin';

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

let deviceDataInterval = null;
let deviceId = null;

class Device extends Component {

  componentWillMount() {
    deviceId = getParameterByName('id');
    this.props.getDeviceDetails(deviceId);
    deviceDataInterval = TimerMixin.setInterval(() => {
      console.log("reading");
      if (this.props.device && this.props.device.state.status === "Active") {
        this.props.getDeviceMostRecentData(deviceId);
      }
    }, 10000);
  }

  componentWillUnmount() {
    TimerMixin.clearInterval(deviceDataInterval);
  }

  changeDeviceStatus(status) {
    this.props.changeDeviceStatus(deviceId, status, this.props.device);
  }

  renderDeleteDeviceModal(device) {
    return(
        <div className="modal fade" id="deleteModal" role="dialog">
          <div className="modal-dialog">
          
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">You will delete: {device.photonName}</h4>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this device?</p>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => this.changeDeviceStatus('Deleted')} className="btn btn-danger pull-left" data-dismiss="modal">Yes</button>
                <button type="button" className="btn btn-default" data-dismiss="modal">Get me out of here!</button>
              </div>
            </div>
            
          </div>
        </div>);
  }

  renderDeviceDetails() {
    const device = this.props.device;
    const deviceMostRecentData = this.props.deviceMostRecentData ? this.props.deviceMostRecentData : undefined;
    const pastData = device && device.pastData ? device.pastData : undefined;
    const loadError = this.props.error;

    const chart = {
        data: {
          names: {
            current: 'Current',
            tension: 'Tension',
            apparentPower: 'Apparent Power'
          }
        }
    };

    if (device) {
      return(<div>
        <span>Name: </span> <b> {device.photonName} </b> <br /><br />
        <span>Status: </span>{device.state.status && device.state.status == "Active" ?
          <i className="fa fa-bolt" style={{fontSize: '20px', color: 'orange'}}></i> :
          <i className="fa fa-bolt" style={{fontSize: '20px', color: 'black'}}></i> } {device.state.status} <br /><br />
        <span>Internal Id:</span> {device._id} <br /><br />
        <span>Device Id: </span>{device.photonId} <br /><br />
        <span>Claim Date: </span>{device.claimDate} <br /><br />

        {device.state.status && device.state.status === 'Active' ?
          <button type="button" onClick={() => this.changeDeviceStatus('Inactive')} className="btn btn-warning pull-left">{"Turn Off Device"}</button>
          :
          <button type="button" onClick={() => this.changeDeviceStatus('Active')} className="btn btn-success pull-left">{"Turn On Device"}</button>
        }

        <button type="button" data-toggle="modal" data-target="#deleteModal" className="btn btn-danger pull-right">Delete Device</button>

        <br /><br />

        <hr />

        <RTChart
            chart={chart}
            fields={['current', 'tension', 'apparentPower']}
            data={deviceMostRecentData}
            initialData={pastData} />

        {this.renderDeleteDeviceModal(device)}

        

      </div>);

    } else if (loadError) {
      return (<div><span>No device found</span></div>);
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
                              <h3 className="panel-title"><i className="fa fa-power-off fa-fw"></i> Device Details</h3>
                          </div>
                          <div className="panel-body">
                              {this.renderDeviceDetails()}
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
      device: state.devices.device,
      deviceMostRecentData: state.devices.deviceMostRecentData,
      error: state.devices.error
    };
}

export default connect(mapStateToProps, actions)(Device);
