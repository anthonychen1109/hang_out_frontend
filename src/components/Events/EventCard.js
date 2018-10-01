import React, { Component } from 'react';

class EventCard extends Component {
  render() {
    const background = {
      backgroundImage: `url(${this.props.event.event_img})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }
    return (
      <div className="eventCard" style={background}>
        <div className="overlay">
          <h1>{this.props.event.name}</h1>
          {
            this.props.eventPassed
            ?
              this.props.event.users.length > 1
              ? <h3>{this.props.event.users.length} users went</h3>
              : <h3>{this.props.event.users.length} user went</h3>
            :
              this.props.event.users.length > 1
              ? <h3>{this.props.event.users.length} users attending</h3>
              : <h3>{this.props.event.users.length} user attending</h3>
          }
        </div>
      </div>
    )
  }
}

export default EventCard;
