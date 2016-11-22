import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import RTChart from 'react-rt-chart';
import TimerMixin from 'react-timer-mixin';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';

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

  constructor(props) {
    super(props);
    this.state = {
      deviceNameSocket1: "",
      editDeviceNameSocket1: false,
      reportStartDateSocket1: null,
      reportEndDateSocket1: null,
      kWReaisHourSocket1: 0,

      deviceNameSocket2: "",
      editDeviceNameSocket2: false,
      reportStartDateSocket2: null,
      reportEndDateSocket2: null,
      kWReaisHourSocket2: 0,
    };
  }

  componentWillMount() {
    deviceId = getParameterByName('id');
    this.props.getDeviceDetails(deviceId);
    deviceDataInterval = TimerMixin.setInterval(() => {
      console.log("Reading...");
      if (this.props.device) {
        if (this.props.device.socket1 && 
            this.props.device.socket1.state && 
            this.props.device.socket1.state.status === "Active") {

          this.props.getDeviceMostRecentData(deviceId, 1);
        }

        if (this.props.device.socket2 && 
            this.props.device.socket2.state && 
            this.props.device.socket2.state.status === "Active") {

          this.props.getDeviceMostRecentData(deviceId, 2);
        }
      }

    }, 10000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.device && 
        nextProps.device.socket1 && 
        nextProps.device.socket1.name && 
        this.state.deviceNameSocket1 === "") {
      this.setState({
        deviceNameSocket1: nextProps.device.socket1.name
      });
    }

    if (nextProps.device && 
        nextProps.device.socket2 && 
        nextProps.device.socket2.name && 
        this.state.deviceNameSocket2 === "") {
      this.setState({
        deviceNameSocket2: nextProps.device.socket2.name
      });
    }
  }

  componentWillUnmount() {
    TimerMixin.clearInterval(deviceDataInterval);
  }

  changeDeviceStatus(status, socketNum) {
    this.props.changeDeviceStatus(deviceId, socketNum, status);
  }

  editDeviceName(status, socketNum) {
    if (socketNum === 1) {
      this.setState({editDeviceNameSocket1: status});
    } else if (socketNum === 2) {
      this.setState({editDeviceNameSocket2: status});
    }
  }

  changeDeviceName(socketNum) {
    let currentScope = this;
    if (socketNum === 1) {
      this.props.changeDeviceName(deviceId, this.state.deviceNameSocket1, socketNum, currentScope);
    } else if (socketNum === 2) {
      this.props.changeDeviceName(deviceId, this.state.deviceNameSocket2, socketNum, currentScope);
    }
  }

  onInputChange(deviceName, socketNum) {
    if (socketNum === 1) {
      this.setState({deviceNameSocket1: deviceName});
    } else if (socketNum === 2) {
      this.setState({deviceNameSocket2: deviceName});
    }
  }

  onkWReaisHourChange(kWReaisHour, socketNum) {
    if (socketNum === 1) {
      this.setState({kWReaisHourSocket1: kWReaisHour});
    } else if (socketNum === 2) {
      this.setState({kWReaisHourSocket2: kWReaisHour});
    }
  }

  generateReport(socketNum, startDate, endDate, kWReaisHour) {
      this.props.generateReport(deviceId, socketNum, startDate, endDate, kWReaisHour); 
  }

  handleApply(event, picker, socketNum) {
    if (socketNum === 1) {
      this.setState({
        reportStartDateSocket1: picker.startDate,
        reportEndDateSocket1: picker.endDate
      });
    } else if (socketNum === 2) {
      this.setState({
        reportStartDateSocket2: picker.startDate,
        reportEndDateSocket2: picker.endDate
      });
    }
  }

  renderDeleteDeviceModal(socket, socketNum) {
    return(
        <div className="modal fade" id={"deleteModal"+socketNum} role="dialog">
          <div className="modal-dialog">
          
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">You will delete {socket.name}</h4>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete {socket.name}?</p>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => this.changeDeviceStatus('Deleted', socketNum)} className="btn btn-danger pull-left" data-dismiss="modal">Yes</button>
                <button type="button" className="btn btn-default" data-dismiss="modal">Get me out of here!</button>
              </div>
            </div>
            
          </div>
        </div>);
  }

  renderGenerateReportModal(socket, socketNum, startDate, endDate, report, kWReaisHour) {

    return(
        <div className="modal fade" id={"reportModal"+socketNum} role="dialog">
          <div className="modal-dialog">
          
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Report for socket: {socket.name}</h4>
              </div>
              <div className="modal-body">
                Select a date range: 

                <DatetimeRangePicker
                  timePicker
                  timePicker24Hour
                  showDropdowns
                  timePickerSeconds
                  startDate={startDate}
                  endDate={endDate}
                  onApply={(event, picker) => this.handleApply(event, picker, socketNum)}
                >
                  <button type="button" className="btn btn-default">
                      <i className="fa fa-calendar"/> &nbsp;
                      <span>
                      {
                        (startDate && endDate) ? 
                        startDate.format('YYYY-MM-DD (HH:mm)') + " to " + endDate.format('YYYY-MM-DD (HH:mm)')
                        : "Select date"
                      }
                      </span> &nbsp;
                      <i className="fa fa-angle-down"/>
                  </button>
                  
                </DatetimeRangePicker>

                <br />

                <span>
                  kWh price (R$): <input type="number" onChange={event => this.onkWReaisHourChange(event.target.value, socketNum)} value={kWReaisHour}/>
                </span>

                <br />
                
                {report ? 
                  <div>
                    <hr />
                    <p>Consumption in kW: {report.data.consumptionkW}</p> 
                    <p>Consumption in Reais: {report.data.consumptionReais}</p> 
                  </div>
                 : <span></span>}
                 
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => this.generateReport(socketNum, startDate, endDate, kWReaisHour)} className="btn btn-success pull-left">Generate report</button>
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
            
          </div>
        </div>);
  }

  renderSocket(socket, socketNum, editDeviceNameSocket, deviceNameSocket, deviceMostRecentData, pastData, startDate, endDate, report, kWReaisHour, chart) {

    if (socket.state.status === 'Deleted') {
      return (<span></span>);
    }

    return (<div>
      <span>Name Socket {socketNum}: </span> 
      {editDeviceNameSocket}
      {editDeviceNameSocket === false ? 
        <b>{deviceNameSocket}</b> 
      :
        <span>
          <input type="text" onChange={event => this.onInputChange(event.target.value, socketNum)} value={deviceNameSocket}/>
        </span>
      }

      <br /><br />

      <span>Status: </span>{socket && socket.state.status == "Active" ?
        <i className="fa fa-bolt" style={{fontSize: '20px', color: 'orange'}}></i> :
        <i className="fa fa-bolt" style={{fontSize: '20px', color: 'black'}}></i> } {socket.state.status} <br /><br />

      {editDeviceNameSocket === false ? 
        <button type="button" onClick={() => this.editDeviceName(true, socketNum)} className="btn btn-primary pull-left">Edit Device Name</button>
        :
        <span>
          <button type="button" onClick={() => this.changeDeviceName(socketNum)} className="btn btn-primary pull-left" style={{marginRight: '10px'}}>Save</button>
          <button type="button" onClick={() => this.editDeviceName(false, socketNum)} className="btn btn-default pull-left">Cancel</button>
        </span>
      }

      <button type="button" data-toggle="modal" data-target={"#reportModal"+socketNum} className="btn btn-success pull-right">Generate Report</button>
      
      <br /><br /><br />
      
      {socket && socket.state.status === 'Active' ?
        <button type="button" onClick={() => this.changeDeviceStatus('Inactive', socketNum)} className="btn btn-warning pull-left">{"Turn Off Device"}</button>
        :
        <button type="button" onClick={() => this.changeDeviceStatus('Active', socketNum)} className="btn btn-success pull-left">{"Turn On Device"}</button>
      }

      <button type="button" data-toggle="modal" data-target={"#deleteModal"+socketNum} className="btn btn-danger pull-right">Delete Device</button>

      <br /><br /><br /><br />

      <RTChart
          chart={chart}
          fields={['current', 'tension', 'apparentPower']}
          data={deviceMostRecentData}
          initialData={pastData} />

      {this.renderDeleteDeviceModal(socket, socketNum)}

      {this.renderGenerateReportModal(socket, socketNum, startDate, endDate, report, kWReaisHour)}

    </div>);

  }

  renderSocketDetails(device) {

    const deviceMostRecentData = this.props.deviceMostRecentData ? this.props.deviceMostRecentData : {};
    const pastData = device && device.pastData ? device.pastData : [];

    const deviceMostRecentDataSocket1 = deviceMostRecentData.socketNum === 1 ? deviceMostRecentData : undefined;
    const deviceMostRecentDataSocket2 = deviceMostRecentData.socketNum === 2 ? deviceMostRecentData : undefined;

    const pastDataSocket1 = pastData.filter(function(deviceData) {
      return deviceData.socketNum === 1;
    });

    const pastDataSocket2 = pastData.filter(function(deviceData) {
      return deviceData.socketNum === 2;
    });

    const report = this.props.report ? this.props.report : {};
    const reportSocket1 = report.socketNum === 1 ? report : undefined;
    const reportSocket2 = report.socketNum === 2 ? report : undefined;

    const chart = {
        data: {
          names: {
            current: 'Current',
            tension: 'Tension',
            apparentPower: 'Apparent Power'
          }
        }
    };

    return(<div>

        <span>Internal Id:</span> {device._id} <br /><br />
        <span>Device Id: </span>{device.photonId} <br /><br />
        <span>Claim Date: </span>{device.claimDate} 

        <hr />

        {this.renderSocket(
          device.socket1, 
          1, 
          this.state.editDeviceNameSocket1, 
          this.state.deviceNameSocket1,
          deviceMostRecentDataSocket1,
          pastDataSocket1,
          this.state.reportStartDateSocket1,
          this.state.reportEndDateSocket1,
          reportSocket1,
          this.state.kWReaisHourSocket1,
          chart
          )}

        <hr />       

        {this.renderSocket(
          device.socket2, 
          2, 
          this.state.editDeviceNameSocket2, 
          this.state.deviceNameSocket2,
          deviceMostRecentDataSocket2,
          pastDataSocket2,
          this.state.reportStartDateSocket2,
          this.state.reportEndDateSocket2,
          reportSocket2,
          this.state.kWReaisHourSocket2,
          chart
          )}

      </div>);
  }

  renderDeviceDetails() {
    const device = this.props.device;
    const loadError = this.props.error;

    if (device) {
      return this.renderSocketDetails(device);
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
      report: state.devices.report,
      error: state.devices.error
    };
}

export default connect(mapStateToProps, actions)(Device);
