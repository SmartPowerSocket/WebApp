import React, { Component } from 'react';

class DownloadApp extends Component {

  render() {
    return (
          <div className="container-fluid">
              <div className="row">
                  <div className="col-lg-12">
                      <br />
                      <div className="panel panel-default">
                          <div className="panel-body" style={{'textAlign': 'center'}}>
                            <a href="https://www.dropbox.com/s/aav5uf9gv08gvt5/smartpowersocket-app-win32-ia32.zip?dl=1">
                              <button type="button" className="btn btn-default button-marging">
                                <img src="images/windows.png" width="100px" height="100px" alt="Windows 32 bits app"></img> 
                                <br />Windows 32 bits
                              </button>
                            </a>
                            <a href="https://www.dropbox.com/s/kohkcc14yuoikcu/smartpowersocket-app-win32-x64.zip?dl=1">
                              <button type="button" className="btn btn-default button-marging">
                                <img src="images/windows.png" width="100px" height="100px" alt="Windows 64 bits app"></img> 
                                <br />Windows 64 bits
                              </button>
                            </a>
                            <a href="https://www.dropbox.com/s/dchq8js2eaoxrp1/smartpowersocket-app-darwinx64.zip?dl=1">
                              <button type="button" className="btn btn-default button-marging">
                                <img src="images/apple.png" width="100px" height="100px" alt="Mac OSX app"></img> 
                                <br />Mac OSX
                              </button>
                            </a>
                            <a href="https://www.dropbox.com/s/abmdpy60ilq7al7/smartpowersocket-app-linux-ia32.zip?dl=1">
                              <button type="button" className="btn btn-default button-marging">
                                <img src="images/linux.png" width="100px" height="100px" alt="Linux 32 bits app"></img> 
                                <br />Linux 32 bits
                              </button>
                            </a>
                            <a href="https://www.dropbox.com/s/u4vgnl7i7fkoh94/smartpowersocket-app-linux-x64.zip?dl=1">
                              <button type="button" className="btn btn-default">
                                <img src="images/linux.png" width="100px" height="100px" alt="Linux 64 bits app"></img> 
                                <br />Linux 64 bits
                              </button>
                            </a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
    );
  }
}

export default DownloadApp;