import React, { Component } from 'react';

class HandleGroupForm extends Component {
  render() {
    const background = this.props.background
    return (
      <div className="groupForm">
        <div className="groupFormHeader" style={{backgroundImage: `url(${background})`, backgroundSize: 'cover'}}>
          <h1>{this.props.name}</h1>
          <p>{this.props.numUsers} Member(s)</p>
          <hr/>
        </div>
        <div className="groupFormDetails">
          <h2>About us:</h2>
          <p className="groupFormDetailsP">
            {this.props.description}
          </p>
        </div>
      </div>
    )
  }
}

export default HandleGroupForm;
