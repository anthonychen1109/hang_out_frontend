import React, { Component } from 'react';

class StartOwn extends Component {
  render() {
    return (
      <div className="startOwn">
        <div className="startOwnHeader container">
          <h1>Start a new group</h1>
        </div>
        <hr/>
        <div className="startOwnDocs container">
          <div>
            <a href="http://127.0.0.1:8000/docs/" target="_blank">API DOCS</a>
          </div>
          <div>
            <a href="http://127.0.0.1:8000/swagger-docs/" target="_blank">API SWAGGER DOCS</a>
          </div>
        </div>
      </div>
    )
  }
}

export default StartOwn;
