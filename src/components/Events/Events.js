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
    hasToken: false
  }

  componentDidMount() {
    this.props.getEvents()
    this.props.getUserInfo(this.props.location.state.id)
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
    console.log('hit renderUserEvents', this.props);
    if (this.props.userInfo.user) {
      console.log('true');
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
    // console.log(this.props.location.state.id);
    // console.log("DFDSAFSDA", this.props.userInfo.user)
    return (
      <div>
        <Navbar hasToken={this.props.location.state.registered} deleteToken={this.deleteToken}/>
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
            {this.renderEvents()}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);
