import React, { Component } from 'react';

class EventCard extends Component {
  render() {
    console.log(this.props.event);
    const background = {
      backgroundImage: `url(${this.props.event.event_img})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }
    return (
      <div className="eventCard" style={background}>
        <div className="overlay">
          <h1>{this.props.event.name}</h1>
          <h3>{this.props.event.users.length} user(s) attending</h3>
        </div>
      </div>
    )
  }
}

export default EventCard;
