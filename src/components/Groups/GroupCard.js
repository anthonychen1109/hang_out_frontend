import React, { Component } from 'react';

class GroupCard extends Component {

  getGroup = () => {

  }
  
  render() {
    const background = this.props.group.group_img
    return (
      <div
        className="groupCard card"
        style={{backgroundImage: `url(${background})`, backgroundSize: 'cover'}}
        onClick={this.getGroup}
        >
        <div className="overlay">
          <div className="card-body">
            <h3 className="groupCardName card-title">{this.props.group.name}</h3>
            <p className="groupCardDescription card-text">{this.props.group.description}</p>
            <p className="groupCardUsers card-text">{this.props.group.num_users} Member(s)</p>
            <a href="#" className="btn btn-primary">+</a>
          </div>
        </div>
      </div>
    )
  }
}

export default GroupCard;
