import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

class GroupFiller extends Component {

  handleCategories = () => {
    this.props.history.push({
      pathname: '/home'
    })
  }

  handleSubmit = () => {
    this.props.history.push({
      pathname: '/events'
    })
  }

    render() {
        return (
          <div className="groupsFiller">
              <div className="overlay">
                  <div className="fillerDiv">
                      <h1>Groups in Hang Outs</h1>
                      <div className="groupsFillerButtons">
                        <Button
                          inverted color="blue"
                          onClick={this.handleCategories}>
                          See Categories
                        </Button>
                        <Button
                          inverted color="blue"
                          onClick={this.handleSubmit}>
                          See Events
                        </Button>
                      </div>
                  </div>
              </div>
          </div>
        )
    }
}

export default withRouter(GroupFiller);
