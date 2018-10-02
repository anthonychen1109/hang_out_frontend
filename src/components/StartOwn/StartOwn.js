import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class StartOwn extends Component {
  render() {
    return (
      <div className="startOwn">
        <div className="startOwnHeader container">
          <Link to='/new_group'><h1>Start a new group</h1></Link>
        </div>
        <div className="startOwnDocs container">
          <div>
            <div className="startOwnDocsSocial">
              <div>
                <a href="https://www.linkedin.com/in/anthony-chen-1109" target="_blank"><i className="fab fa-linkedin fa-3x"></i></a>
              </div>
              <div>
                <a href="https://www.github.com/anthonychen1109" target="_blank"><i className="fab fa-github fa-3x"></i></a>
              </div>
              <div>
                <a href="mailto:chen.anthony.1109@gmail.com"><i className="fas fa-envelope fa-3x"></i></a>
              </div>
            </div>
            <div className="copyright">
                <p className="signature">&copy; Anthony Chen</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default StartOwn;
