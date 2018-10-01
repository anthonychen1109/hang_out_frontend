import React, { Component } from 'react';

class CreateGroupFiller extends Component {
    render() {
        return (
          <div className="groupsFiller">
              <div className="overlay">
                  <div className="fillerDiv">
                    {
                      this.props.hasToken
                      ? <h1>Start a new group!</h1>
                      : <h1 className="animated shake">MUST BE LOGGED IN TO START A NEW GROUP</h1>
                    }
                  </div>
              </div>
          </div>
        )
    }
}

export default CreateGroupFiller;
