import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getGroup } from './actions';
import Navbar from '../Navbar/Navbar';
import EventCard from '../Events/EventCard';
import StartOwn from '../StartOwn/StartOwn';
import GroupInfoMember from './GroupInfoMember';
import GroupPhotoModal from './GroupPhotoModal';
import Time from 'react-time';

const mapStateToProps = (state) => {
  return {
    group: state.group,
    events: state.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGroup: (id) => dispatch(getGroup(id))
  }
}

class GroupInfo extends Component {

  state = {
    hasToken: '',
    inGroup: '',
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ hasToken: true })
    }
    this.props.getGroup(this.props.location.state.id)
  }

  renderGroup = () => {
    return this.props.group.name
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

  renderMembers = () => {
    if (this.props.group.group.num_users) {
      if (this.props.group.group.num_users.length === 0) {
        return <p>Currently no members</p>
      } else if (this.props.group.group.num_users === 1) {
        return <GroupInfoMember member={this.props.group.group.users[0]}/>
      }
      return this.props.group.group.num_users.map(member => {
        return <GroupInfoMember member={member}/>
      })
    }
  }

  groupImages = () => {
    if (this.props.group.group.events) {
      if (this.props.group.group.events === 0) {
        return <p>No Events</p>
      } else if (this.props.group.group.events.length === 1) {
        return <div className="photoModal"><GroupPhotoModal image={this.props.group.group.events[0].event_img}/></div>
      } else if (this.props.group.group.events.length > 1) {
        return this.props.group.group.events.map( (event, index) => {
          return <div key={index} className="photoModal"><GroupPhotoModal image={event.event_img}/></div>
        })
      }
    }
  }

  displayEvent = (id) => {
    console.log("here", id);
    this.props.history.push({
      pathname: `/events/${id}`,
      state: {
        id,
        organizer_name: this.props.group.group.organizer_name,
        name: this.props.group.group.name,
        group_img : this.props.group.group.group_img
      }
    })
  }

  createEvent = () => {
    console.log('create');
  }

  render() {
    let now = new Date()
    const pastEvents = []
    const upcomingEvents = []
    if (this.props.group.group.events) {
      this.props.group.group.events.map(event => {
        const date = event.date.split("T")
        const newDate = new Date(`${date[0]} ${date[1]}`)
        if (newDate < now) {
          pastEvents.push(event)
        } else {
          upcomingEvents.push(event)
        }
      })
      console.log(this.props.group.group);
    }
    return (
      <div>
        <Navbar setToken={this.setToken} deleteToken={this.deleteToken} hasToken={this.state.hasToken}/>
        <hr/>
        <div className="groupInfoFiller container">
          <div className="groupInfoImage">
            <img src={this.props.group.group.group_img} alt="group image"/>
          </div>
          <div className="groupInfoContent">
            <h1>{this.props.group.group.name}</h1>
            {
              this.props.group.group.num_users > 1
              ? <p>{this.props.group.group.num_users} members</p>
              : <p>{this.props.group.group.num_users} member</p>
            }
            <p>organized by {this.props.group.group.organizer_name}</p>
            <button className="btn btn-primary" onClick={this.createEvent}>Join Group</button>
          </div>
        </div>
        <hr/>
        <div className="groupInfoAbout container">
          <div className="groupInfoLeft">
            <div>
              <h1>What we're about</h1>
              <p>{this.props.group.group.description}</p>
            </div>
            <div className="groupInfoLeftMembers">
              <h1>Members ( {this.props.group.group.num_users})</h1>
              <div className="groupInfoLeftMembersDisplay">
                {this.renderMembers()}
              </div>
            </div>
          </div>
          <div className="groupInfoRight">
            <h1>Upcoming Events ({upcomingEvents.length})</h1>
            <div className="upcomingEventsCards">
              {
                upcomingEvents.length > 0
                ? upcomingEvents.map( (event, index) =>
                <div className="groupInfoRightEvent" key={index} onClick={() => this.displayEvent(event.id)}>
                  <EventCard event={event} eventPassed={false}/>
                </div>)
                : <p>No Events</p>
              }
            </div>
            <h1>Past Events ({pastEvents.length})</h1>
            <div className="pastEventsCards">
              {
                pastEvents.length > 0
                ? pastEvents.map( (event, index) =>
                <div className="groupInfoRightEvent" key={index} onClick={() => this.displayEvent(event.id)}>
                  <EventCard event={event} eventPassed={true}/>
              </div>)
                : <p>No Events</p>
              }
            </div>
          </div>
        </div>
        <div className="groupInfoPhotos container">
          <div>
            {
              this.props.group.group.events
              ? <h1>Photos ({this.props.group.group.events.length})</h1>
              : <h1>Photos (0)</h1>
            }
          </div>
          <div className="groupInfoImage">
            {this.groupImages()}
          </div>
        </div>
        <StartOwn />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupInfo));
