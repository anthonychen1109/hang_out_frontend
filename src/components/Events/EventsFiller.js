import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

class EventsFiller extends Component {

  handleSubmit = () => {
    this.props.history.push({
      pathname: '/home'
    })
  }

  render() {
    return (
        <div className="eventsFiller">
            <div className="overlay">
                <div className="fillerDiv">
                    <h1>Events at Hang Outs</h1>
                      <Button
                        inverted color="blue"
                        onClick={this.handleSubmit}>
                        See Categories
                    </Button>
                </div>
            </div>
        </div>
    )
  }
}

export default withRouter(EventsFiller);
