import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvents } from './actions';
import Navbar from '../Navbar/Navbar';
import EventsFiller from './EventsFiller';
import EventCard from './EventCard';

const mapStateToProps = (state) => {
  return {
    events: state.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEvents: () => dispatch(getEvents())
  }
}

class Events extends Component {

  state = {
    hasToken: false
  }

  componentDidMount() {
    this.props.getEvents()
  }

  deleteToken = () => {
    const token = localStorage.removeItem("token")
    if (token) {
      this.setState({
        hasToken: false
      })
    }
  }

  renderEvents = () => {
    return this.props.events.events.map( (event, index) => {
      return <EventCard key={index} event={event}/>
    })
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Navbar hasToken={this.props.location.state.registered} deleteToken={this.deleteToken}/>
        <EventsFiller />
        <div className="eventCards">
          {this.renderEvents()}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);
