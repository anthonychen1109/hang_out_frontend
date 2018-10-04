import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getEvents, getUserInfo } from './actions';
import Navbar from '../Navbar/Navbar';
import EventsFiller from './EventsFiller';
import EventCard from './EventCard';
import StartOwn from '../StartOwn/StartOwn';

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
    hasToken: '',
    user_id: '',
    username: '',
    first_name: '',
    last_name: ''
  }

  componentDidMount() {
    this.props.getEvents()
    // this.props.getUserInfo(this.props.location.state.id)
    if (localStorage.getItem("token")) {
      // this.setState({ hasToken: true })
      this.getUser()
    }
  }

  getUser = () => {
    fetch('http://localhost:8000/api/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({
            user_id: json.id,
            hasToken: true,
            username: json.username,
            first_name: json.first_name,
            last_name: json.last_name
          }, () => this.props.getUserInfo(this.state.user_id))
        })
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
    // console.log('before condition check');
    if (this.props.userInfo.user) {
      console.log(this.props.userInfo);
      if (this.props.userInfo.user.events.length === 0) {
        return <div>You currently have no events. Please join one</div>
      } else if (this.props.userInfo.user.events.length === 1) {
        return <div onClick={() => this.showEventDetails(this.props.userInfo.user.events[0].id)} className="eventCardDisplay"><EventCard event={this.props.userInfo.user.events[0]} /></div>
      } else {
        return this.props.userInfo.user.events.map( (event, index) => {
          return <div key={index} onClick={() => this.showEventDetails(event.id)} className="eventCardDisplay"><EventCard event={event} /></div>
        })
      }
    }
  }

  showEventDetails = (id) => {
    this.props.history.push({
      pathname: `/events/${id}`,
      state: {
        id
      }
    })
  }

  renderEvents = () => {
    if (this.props.events.events.length === 0) {
      return <div>Currently No Events</div>
    } else if (this.props.events.events.length === 1) {
      return <div onClick={() => this.showEventDetails(this.props.events.events[0].id)} className="eventCardDisplay"><EventCard event={this.props.events.events[0]}/></div>
    } else {
      return this.props.events.events.map( (event, index) => {
        return <div key={index} onClick={() => this.showEventDetails(event.id)} className="eventCardDisplay"><EventCard event={event}/></div>
      })
    }
  }

  render() {
    return (
      <div>
        <Navbar setToken={this.setToken} deleteToken={this.deleteToken} hasToken={this.state.hasToken} />
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
        <StartOwn />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Events));
