import React, { Component } from 'react';
import { getEvents, getUserInfo } from './actions';

import { Button } from 'semantic-ui-react'
import Navbar from '../Navbar/Navbar';
import StartOwn from '../StartOwn/StartOwn';
import { connect } from 'react-redux';
import { getCategory } from '../Categories/actions';
import { getEvent } from '../Events/actions';
import { getGroup } from '../Groups/actions';
import withUser from '../Hoc/withUser';

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
    hasToken: '',
    user_id: '',
    username: '',
    first_name: '',
    last_name: '',
    joined: ''
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    // this.props.getEvents()
    if (localStorage.getItem("token")) {
      this.getUser()
      // this.setState({ hasToken: true })
    }
    // if (this.props.location.state) {
    //   this.props.getEvent(this.props.location.state.id)
    // } else {
      const path = this.props.location.pathname.split('/')
      const searchPath = path[2]
      this.props.getEvent(searchPath)
    // }
    if (this.props.curr_event.curr_event) {
      console.log("USER ID", this.state.user_id);
      console.log("comparison", this.props.curr_event.curr_event.users.includes(this.state.user_id));
      this.props.curr_event.curr_event.users.includes(this.state.user_id)
      ? this.setState({ joined: true})
      : null
    }
  }

  userAlreadyAttending = () => {
    const path = this.props.location.pathname.split('/')
    const searchPath = path[2]
    this.props.getEvent(searchPath)
    if (this.props.curr_event.curr_event) {
      this.props.curr_event.curr_event.users.includes(this.state.user_id)
      ? this.setState({ joined: true})
      : null
    }
  }

  getUser = () => {
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
          }, () => this.userAlreadyAttending())
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

  getEvent = (id) => {
    if (this.props.group.group.events) {
      const selectedEvent = this.props.group.group.events.find(event => {
        return event.id === id
      })
      return <p>{selectedEvent.details}</p>
    }
  }

  renderDate = () => {
    if (this.props.curr_event.curr_event) {
      const date = this.props.curr_event.curr_event.date.split("T")
      const formattedDate = date[0].split("-")
      const day = formattedDate[2]
      let month = formattedDate[1]
      switch(month) {
        case '1':
          month = 'JAN'
          break;
        case '2':
          month = 'FEB'
          break;
        case '3':
          month = 'MAR'
          break;
        case '4':
          month = 'APR'
          break;
        case '5':
          month = 'MAY'
          break;
        case '6':
          month = 'JUN'
          break;
        case '7':
          month = 'JUL'
          break;
        case '8':
          month = 'AUG'
          break;
        case '9':
          month = 'SEPT'
          break;
        case '10':
          month = 'OCT'
          break;
        case '11':
          month = 'NOV'
          break;
        case '12':
          month = 'DEC'
          break;
        default:
          return null
      }
      return (
        <div className="dateCard">
          <div>
            <p className="dateCardDay">{day}</p>
          </div>
          <div>
            <p className="dateCardMonth">{month}</p>
          </div>
        </div>
      )
    } else {
      return <div>No Date</div>
    }
  }

  renderDetails = () => {
    if (this.props.curr_event.curr_event) {
      return (
        <p>
          {this.props.curr_event.curr_event.details}
        </p>
      )
    }
  }

  renderGroupName = () => {
    if (this.props.curr_event.curr_event) {
      return (
        <h1>{this.props.curr_event.curr_event.name}</h1>
      )
    }
  }

  renderFullDate = () => {
    if (this.props.curr_event.curr_event) {
      const date = this.props.curr_event.curr_event.date.split("T")
      const formattedDate = date[0].split("-")
      const day = formattedDate[2]
      let month = formattedDate[1]
      const year = formattedDate[0]
      switch(month) {
        case '1':
          month = 'JANUARY'
          break;
        case '2':
          month = 'FEBRUARY'
          break;
        case '3':
          month = 'MARCH'
          break;
        case '4':
          month = 'APRIL'
          break;
        case '5':
          month = 'MAY'
          break;
        case '6':
          month = 'JUNE'
          break;
        case '7':
          month = 'JULY'
          break;
        case '8':
          month = 'AUGUST'
          break;
        case '9':
          month = 'SEPTEMBER'
          break;
        case '10':
          month = 'OCTOBER'
          break;
        case '11':
          month = 'NOVEMBER'
          break;
        case '12':
          month = 'DECEMBER'
          break;
        default:
          return null
      }
      return (
        <p>{month} {day}, {year}</p>
      )
    }
  }

  renderOrganizerCategory = () => {
    if (this.props.location.state) {
      return (
        <div className="eventDetailHostCategory">
          <div className="hostAvatar">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAMAAAAqJH57AAAANlBMVEWVu9////+QuN6Mtt35+/3v9Pqvy+bU4vGqyOXe6fSavuD1+Py30OigwuLC1+zY5fLN3u/l7vcDMSz6AAADSElEQVRoge2b65arIAyFJYAKgpf3f9njpTO9WGXHhnrWGvfPs07na4SQZFOL4tKlS39bpHUR60mx0Jq+hqW6dY1Ri0zj2pq+Ade+t+pVtvc6M5eKyqy4c+hVkTVuCu+5MztkROtqkzupyvbE9bALVmrIhE6Cc6F1nwQr1WdAUw2AlaozbLN1Fr+TFedSgMBKyecWFrJ80FSCYKVK2aC1g8lOdnv7BiY3XpSMpdSiWhJMLYPcSi40Y5mFF1qjOTXJipLxDTZuMdG0YpElwX67FVnLSKbVXySft8502t4+MZ/Tzd9dom0g7Tfaz6okn/Z5FYNVJUtJcBHxhDZRlAw3gOIt4Hl9GNxuyzfcESYLL/N5nT5+loieI7PQjBbteWcROEvKT7GEDO7j6J5hfiaInMMfgoKW31+zAHIWLhJ0jlWe0amCZXK5gEnjQNgueFDCEsthhv2i94qlcHl8EW2jXWZ3nboNcJcRvPzpjTb01nBmOcL8LVl1XLf9Q1zWmHovzCaK1b0O6fp5tV1921tTPaui3HUKaR2WMO3P09RU9s4aY6zrS/rh+qWQDkHmIklTeIiw/M2c8fvM+mXoh3PGBfowxUiXL2m0dUVDxcumd+UngeuwbkRM+4ZNRbs+0215PO73x0bTx+IhnvG5xv79ZO+Ogrc7L1uFuLghPoZq5/8d4lJqWm+stSkXYziw1olbMVQHbs84E/Oe2P03yxnZE9s1kQqZHbTeKoZ8dbygk80eLl5byBjU02KN8iz/KyXW3KHlHvb4uDkL7QXBSjFcZ9FlZi00OCujYkxbyWLBE6NsaFGwUvgWw+wBXHjM+GUzJtj9ZbnZiGDHe3N2Oip45hLe2pzNzbkjQoTfYAmDccsId5RRgc4z4xccqEDrRjyp4LQSrheTwJohns5wQu/4P0cF+kbiBwl+lHCufDGhM+VF/iL5xL0tN0f+CP1FJNWyZbJh/BRzZYN9IK4x9mz9HcceMQOJdLljOKVlqzHagz4gjR8M3ZHDdOjC/OlPNH7e162z6FxrrGtr/yn1jp9eRWg72+zxTWO7tn5yJoW0vAoR2m4Yv8H9K5iROHRtyP6CBM3GNvnpdYxyeiHDL//wtZcyLl269P/pHwa5JDf/Az7rAAAAAElFTkSuQmCC" alt="avatar image"/>
          </div>
          {
            this.props.curr_event.curr_event
            ? <div>
                <div>
                  {
                    this.props.location.state.organizer_name
                    ? <p>Hosted by {this.props.location.state.organizer_name}</p>
                    : this.props.curr_event.curr_event.organizer && <p>Hosted by {this.props.curr_event.curr_event.organizer}</p>
                }
              </div>
              <div>
                {
                  this.props.location.state.name
                  ? <p>From {this.props.location.state.name}</p>
                  : this.props.curr_event.curr_event.name && <p>From {this.props.curr_event.curr_event.name}</p>
              }
            </div>
          </div>
          : null
        }
        </div>
      )
    }
  }

  renderImage = () => {
    if (this.props.curr_event.curr_event) {
      const img = this.props.curr_event.curr_event.event_img
      return (
        <img className="eventDetailImg" src={img} alt="event_img"/>
      )
    }
  }

  handleCategories = () => {
    this.props.history.push({
      pathname: '/home'
    })
  }

  handleEvents = () => {
    this.handleAttend()
  }

  handleAttend = () => {
    // this.props.getEvent(this.props.curr_event.curr_event.id)
    if (this.state.hasToken) {
      const newUser = this.state.user_id
      const newEvent = {
        ...this.props.curr_event.curr_event,
        users: [...this.props.curr_event.curr_event.users, newUser]
      }
      fetch(`https://hang-out-backend.herokuapp.com/api/v1/events/${this.props.curr_event.curr_event.id}/`, {
        method: "PUT",
        body: JSON.stringify(newEvent),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then( r => r.json())
      .then(response => {
        console.log('Success:', response)
        this.setState({ joined: true }, this.props.history.push({
          pathname: '/events'
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

  handlePop = () => {
    if (this.state.hasToken) {
      const newUser = this.state.user_id
      const popped = this.props.curr_event.curr_event.users.filter( user => {
        return user !== this.state.user_id
      })
      const newEvent = {
        ...this.props.curr_event.curr_event,
        users: popped
      }
      fetch(`https://hang-out-backend.herokuapp.com/api/v1/events/${this.props.curr_event.curr_event.id}/`, {
        method: "PUT",
        body: JSON.stringify(newEvent),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then( r => r.json())
      .then(response => {
        console.log('Success:', response)
        this.setState({ joined: true }, this.props.history.push({
          pathname: '/events'
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

  render() {
    return (
      <div>
        <Navbar setToken={this.setToken} deleteToken={this.deleteToken} hasToken={this.state.hasToken}/>
        <hr/>
        <div className="eventDetailContainer container">
          <div className="eventDetailDateTitle">
            <div>
              {this.renderDate()}
            </div>
            <div className="eventDetailTitleRight">
              <div>
                {this.renderFullDate()}
              </div>
              <div>
                {this.renderGroupName()}
              </div>
              <div className="eventDetailOrganizerCategory">
                {this.renderOrganizerCategory()}
              </div>
              <div>
                <div className="eventDetailButtons">
                  <div>
                    <Button
                      basic color="blue"
                      onClick={this.handleCategories}>
                      See Categories
                    </Button>
                  </div>
                  <div>
                    <Button
                      basic color="blue"
                      onClick={this.handleEvents}>
                      See Events
                    </Button>
                  </div>
                </div>
                <div className="eventDetailAttend">
                  {
                    this.state.joined
                    ? <div>
                        <p className="eventDetailAlreadyAttending">Already Attending</p>
                        <Button
                          basic color="blue"
                          onClick={this.handleEvents}
                          disabled={true}>
                          Attend
                        </Button>
                        <Button
                          basic color="blue"
                          onClick={this.handlePop}>
                          Unattend
                        </Button>
                      </div>
                    : <Button
                      basic color="blue"
                      onClick={this.handleEvents}>
                      Attend
                    </Button>
                  }
                </div>
              </div>
            </div>
          </div>
          <div>
            {this.renderImage()}
          </div>
        </div>
        <hr/>
        <div className="eventDetailDetails container">
          <h1>Details</h1>
          {this.renderDetails()}
        </div>
        <StartOwn />
      </div>
    )
  }
}

export default withUser(connect(mapStateToProps, mapDispatchToProps)(EventDetail));
