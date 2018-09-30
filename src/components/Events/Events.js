import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvents, getUserInfo } from './actions';
import Navbar from '../Navbar/Navbar';
import EventsFiller from './EventsFiller';
import EventCard from './EventCard';

const mapStateToProps = (state) => {
  return {
    events: state.events,
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEvents: () => dispatch(getEvents()),
    getUserInfo: (id) => dispatch(getUserInfo(id))
  }
}

class Events extends Component {

  state = {
    hasToken: ''
  }

  componentDidMount() {
    this.props.getEvents()
    this.props.getUserInfo(this.props.location.state.id)
  }

  setToken = () => {
    const token = localStorage.getItem("token")
    if (token) {
      this.setState({
        hasToken: true
      })
    }
  }

  deleteToken = () => {
    const token = localStorage.removeItem("token")
    if (token) {
      this.setState({
        hasToken: false
      })
    }
  }

  renderUserEvents = () => {
    if (this.props.userInfo.user) {
      if (this.props.userInfo.user.events.length === 0) {
        return <div>You currently have no events. Please join one</div>
      } else if (this.props.userInfo.user.events.length === 1) {
        return <EventCard event={this.props.userInfo.user.events[0]} />
      } else {
        return this.props.userInfo.user.events.map( (event, index) => {
          return <EventCard key={index} event={event} />
        })
      }
    }
  }

  renderEvents = () => {
    return this.props.events.events.map( (event, index) => {
      return <EventCard key={index} event={event}/>
    })
  }

  render() {
    return (
      <div>
        <Navbar setToken={this.setToken} deleteToken={this.deleteToken} hasToken={this.state.hasToken} registered={this.props.location.state.registered}/>
        <EventsFiller />
        <div className="eventCards">
          <div className="eventCardsUserEvents">
            <div className="eventCardsUserEventsHeader">
              <h1>Your Events</h1>
            </div>
            <div className="eventCardsUserEventsDisplay">
              {this.renderUserEvents()}
            </div>
          </div>
          <div className="eventCardsAllEvents">
            <div className="eventCardsAllEventsHeader">
              <h1>All Events</h1>
            </div>
            <div className="eventCardsAllEventsDisplay">
              {this.renderEvents()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);
