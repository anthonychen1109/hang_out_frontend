import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

class CreateGroupFiller extends Component {

  handleCategories = () => {
    this.props.history.push({
      pathname: '/home'
    })
  }

  handleEvents = () => {
    this.props.history.push({
      pathname: '/events'
    })
  }

    render() {
        return (
          <div className="groupsFiller">
              <div className="overlay">
                  <div className="fillerDiv">
                    {
                      this.props.hasToken
                      ? <div>
                          <h1>Start a new group!</h1>
                            <Button
                              inverted color="blue"
                              onClick={this.handleCategories}>
                              See Categories
                            </Button>
                            <Button
                              inverted color="blue"
                              onClick={this.handleEvents}>
                              See Events
                            </Button>
                        </div>
                      : <div>
                          <h1 className="animated shake">MUST BE LOGGED IN TO START A NEW GROUP</h1>
                            <Button
                              inverted color="blue"
                              onClick={this.handleCategories}>
                              See Categories
                            </Button>
                            <Button
                              inverted color="blue"
                              onClick={this.handleEvents}>
                              See Events
                            </Button>
                        </div>
                    }
                  </div>
              </div>
          </div>
        )
    }
}

export default withRouter(CreateGroupFiller);
