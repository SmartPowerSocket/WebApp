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
                            <a href="https://www.dropbox.com/s/k60nmhuovke3jmo/Windows10.zip?dl=1">
                              <button type="button" className="btn btn-default button-marging">
                                <img src="images/windows.png" width="100px" height="100px" alt="Windows 10 x64"></img>
                                <br />Windows 10<br />64 bits
                              </button>
                            </a>
                            
                              <a href="https://www.dropbox.com/s/t6xu1l1sb53ev79/MacOSX.zip?dl=1">
                                <button type="button" className="btn btn-default button-marging">
                                  <img src="images/apple.png" width="100px" height="100px" alt="Mac OSX"></img>
                                  <br />Mac OSX
                                </button>
                              </a>
                              <hr/>
                              <span>MacOSX Setup:</span> <br/>
                              <video width="320" height="240" controls="controls">
                                <source src="https://www.dropbox.com/s/spugmyxqbx5y2ib/MacOSX-Setup.mov?dl=1" type="video/mp4" />
                              </video>
                            
                          </div>
                      </div>
                  </div>
              </div>
          </div>
    );
  }
}

export default DownloadApp;
