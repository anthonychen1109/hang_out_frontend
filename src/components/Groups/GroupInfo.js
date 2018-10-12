import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getGroup } from './actions';
import Navbar from '../Navbar/Navbar';
import EventCard from '../Events/EventCard';
import StartOwn from '../StartOwn/StartOwn';
import GroupInfoMember from './GroupInfoMember';
import GroupPhotoModal from './GroupPhotoModal';
import Time from 'react-time';
import { Button } from 'semantic-ui-react'

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
    user_id: '',
    username: '',
    first_name: '',
    last_name: '',
    joined: ''
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    if (localStorage.getItem("token")) {
      this.getUserInfo()
      // this.setState({ hasToken: true })
    }
    const path = this.props.location.pathname.split('/')
    const searchPath = path[2]
    this.props.getGroup(searchPath)
    // this.props.getGroup(this.props.location.state.id)
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
        return <GroupInfoMember member={this.props.group.group.user_names[0]}/>
      } else {
        return this.props.group.group.user_names.map( (member, index) => {
          return <GroupInfoMember key={index} member={member}/>
        })
      }
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

  allowedToJoinGroup = () => {
    if (localStorage.getItem("token")) {
      this.getUserInfo()
      this.joinGroup()
      // this.setState({ hasToken: true })
    } else {
      alert("Must be logged in to join group")
    }
  }

  getUserInfo = () => {
    fetch('https://hang-out-backend.herokuapp.com/api/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        this.setState({
          user_id: json.id,
          hasToken: true,
          username: json.username,
          first_name: json.first_name,
          last_name: json.last_name
        })
      })
  }

  joinGroup = () => {
    const newUser = this.state.user_id
    const group = {
      ...this.props.group.group,
      users: [...this.props.group.group.users, newUser]
    }
    console.log("GROUP", group);
    console.log('new user', newUser);
    fetch(`https://hang-out-backend.herokuapp.com/api/v1/groups/${this.props.group.group.id}/`, {
      method: "PUT",
      body: JSON.stringify(group),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then( r => r.json())
    .then(response => {
      console.log('Success:', response)
      this.setState({ joined: true }, this.props.getGroup(this.props.group.group.id))
    })
    .catch(error => console.error('Error:', error));
  }

  handleLeaveGroup = () => {
    if (this.state.hasToken) {
      const newUser = this.state.user_id
      const popped = this.props.group.group.users.filter( user => {
        return user !== newUser
      })
      const newGroup = {
        ...this.props.group.group,
        users: popped
      }
      fetch(`https://hang-out-backend.herokuapp.com/api/v1/groups/${this.props.group.group.id}/`, {
        method: "PUT",
        body: JSON.stringify(newGroup),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then( r => r.json())
      .then(response => {
        console.log('Success:', response)
        this.setState({ joined: false }, this.props.history.push({
          pathname: `/categories/${this.props.group.group.category}`
        }))
      })
      .catch(error => console.error('Error:', error));
    } else {
      alert("Must be logged in to attend event")
      this.props.history.push({
        pathname: this.props.location.pathname
      })
    }
  }

  showJoinButton = () => {
    if (this.props.group.group.users) {
      let result = [this.props.group.group.users].map(function (x) {
        return parseInt(x, 10);
      });
      return result.includes(this.state.user_id) || this.state.joined === true
      ? <div><div><p className="alreadyInGroup">Leave Group?</p></div><div><Button inverted color="red" onClick={this.handleLeaveGroup}>Leave Group</Button></div></div>
      : <Button inverted color="blue" onClick={this.allowedToJoinGroup}>Join Group</Button>
    }
  }

  handleSubmit = () => {
    this.props.history.push({
      pathname: '/home'
    })
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
      console.log(this.props.group.group.category);
      // console.log(this.props.group.group.user_names);
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
              ? <p>{this.props.group.group.num_users} Members</p>
              : <p>{this.props.group.group.num_users} Member</p>
            }
            <div className="groupInfoJoinCategoriesButton">
              <div>
                <p>Organized by {this.props.group.group.organizer_name}</p>
                {this.showJoinButton()}
              </div>
              <div>
                <Button inverted color="blue" onClick={this.handleSubmit}>See Categories</Button>
              </div>
              <div>
                <Link to='/create_event'><Button inverted color="blue">Create Event</Button></Link>
              </div>
              <div>
                <Link to='/events'><Button inverted color="blue">Events</Button></Link>
              </div>
            </div>
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
