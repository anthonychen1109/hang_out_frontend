import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvents, getUserInfo } from './actions';
import { getGroup } from '../Groups/actions';
import { getCategory } from '../Categories/actions';
import { getEvent } from '../Events/actions';
import Navbar from '../Navbar/Navbar';
import StartOwn from '../StartOwn/StartOwn';

const mapStateToProps = (state) => {
  return {
    // events: state.events,
    group: state.group,
    curr_event: state.curr_event
    // userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // getEvents: () => dispatch(getEvents()),
    getGroup: (id) => dispatch(getGroup(id)),
    getEvent: (id) => dispatch(getEvent(id))
    // getUserInfo: (id) => dispatch(getUserInfo(id))
  }
}

class EventDetail extends Component {

  state = {
    hasToken: ''
  }

  componentDidMount() {
    // this.props.getEvents()
    this.props.getEvent(this.props.location.state.id)
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

  getEvent = (id) => {
    if (this.props.group.group.events) {
      const selectedEvent = this.props.group.group.events.find(event => {
        return event.id === id
      })
      return <p>{selectedEvent.details}</p>
    }
  }

  render() {
    return (
      <div>
        <Navbar setToken={this.setToken} deleteToken={this.deleteToken} hasToken={this.state.hasToken}/>
        <hr/>
        <div className="container">
          <div className="eventDetailDateTitle">
            <div>
              date
            </div>
            <div>
              <div>
                <p>Past Meetup</p>
              </div>
              <div>
                <h1>{this.props.group.group.name}</h1>
              </div>
            </div>
          </div>
          <div>
            {
              this.props.group.group.organizer_name
              ? <p>Hosted by {this.props.group.group.organizer_name}</p>
              : null
            }
          </div>
          <div>
            {
              this.props.group.group.name
              ? <p>From {this.props.group.group.name}</p>
              : null
            }
          </div>
        </div>
        <hr/>
        <div className="eventDetailDetails container">
          <h1>Details</h1>
          {this.getEvent(this.props.location.state.id)}
        </div>
        <StartOwn />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
