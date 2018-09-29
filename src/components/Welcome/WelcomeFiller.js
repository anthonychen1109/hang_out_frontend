import React, { Component } from 'react';

class WelcomeFiller extends Component {
  render() {
    return (
      <div className="welcomeFiller">
          <div className="overlay">
              <div className="fillerDiv">
                  <h1 className="welcomeName">
                    Welcome {this.props.firstName} {this.props.lastName}
                  </h1>
              </div>
          </div>
      </div>
    )
  }
}

export default WelcomeFiller;
