import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
    hasToken: ''
  }

  componentDidMount() {
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
          return <div className="photoModal"><GroupPhotoModal image={event.event_img}/></div>
        })
      }
    }
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
    }
    if (this.props.group.group.events) {
      console.log(this.props.group.group.events[0].event_img);
    }
    console.log(this.props.group.group.events);
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
            <h1>Upcoming Events</h1>
            <div>
              {
                upcomingEvents.length > 0
                ? upcomingEvents.map( (event, index) => <EventCard key={index} event={event} passed={false}/>)
                : <p>No Events</p>
              }
            </div>
            <h1>Past Events</h1>
            <div>
              {
                pastEvents.length > 0
                ? pastEvents.map( (event, index) => <Link key={index} to={`/events/${event.id}`}><EventCard event={event} passed={true}/></Link>)
                : <p>No Events</p>
              }
            </div>
          </div>
        </div>
        <div className="groupInfoPhotos container">
          <div>
            <h1>Photos</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupInfo);
