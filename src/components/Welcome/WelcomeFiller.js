import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

class WelcomeFiller extends Component {

  handleEvents = () => {
    this.props.history.push({
      pathname: '/events'
    })
  }

  render() {
    return (
      <div className="welcomeFiller">
          <div className="overlay">
              <div className="fillerDiv">
                  <h1 className="welcomeName">
                    <div>
                      Welcome {this.props.firstName} {this.props.lastName}
                    </div>
                    <div>
                      <Button
                        inverted color="blue"
                        onClick={this.handleEvents}>
                        See Events
                      </Button>
                    </div>
                  </h1>
              </div>
          </div>
      </div>
    )
  }
}

export default withRouter(WelcomeFiller);
