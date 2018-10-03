import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

class EventsFiller extends Component {

  handleSubmit = () => {
    this.props.history.push({
      pathname: '/home'
    })
  }

  handleCreate = () => {
    this.props.history.push({
      pathname: '/create_event'
    })
  }

  handleEvents = () => {
    this.props.history.push({
      pathname: '/events'
    })
  }

  checkPath = () => {
    return this.props.location.pathname === '/create_event'
    ? <div>
        <Button
          inverted color="blue"
          onClick={this.handleSubmit}>
          See Categories
        </Button>
        <Button
          inverted color="blue"
          onClick={this.handleEvents}>
          See Events
        </Button></div>
    : <div>
        <Button
          inverted color="blue"
          onClick={this.handleSubmit}>
          See Categories
        </Button>
        <Button
          inverted color="blue"
          onClick={this.handleCreate}>
          Create Event
      </Button>
    </div>
  }

  render() {
    // console.log(this.props.location.pathname);
    return (
        <div className="eventsFiller">
            <div className="overlay">
                <div className="fillerDiv">
                    <h1>Events at Hang Outs</h1>
                    {this.checkPath()}
                </div>
            </div>
        </div>
    )
  }
}

export default withRouter(EventsFiller);
