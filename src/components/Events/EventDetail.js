import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvents, getUserInfo } from './actions';
import { getGroup } from '../Groups/actions';
import { getCategory } from '../Categories/actions';
import { getEvent } from '../Events/actions';
import Navbar from '../Navbar/Navbar';
import StartOwn from '../StartOwn/StartOwn';
import { Button } from 'semantic-ui-react'

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
    window.scrollTo(0, 0)
    // this.props.getEvents()
    if (localStorage.getItem("token")) {
      this.setState({ hasToken: true })
    }
    if (this.props.location.state) {
      this.props.getEvent(this.props.location.state.id)
    } else {
      const path = this.props.location.pathname.slice(-1)
      this.props.getEvent(path)
    }
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
          <div>
            <div>
              {
                this.props.location.state.organizer_name
                ? <p>Hosted by {this.props.location.state.organizer_name}</p>
                : <p>Hosted by {this.props.curr_event.curr_event.organizer}</p>
              }
            </div>
            <div>
              {
                this.props.location.state.name
                ? <p>From {this.props.location.state.name}</p>
                : <p>From {this.props.curr_event.curr_event.name}</p>
              }
            </div>
          </div>
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
    this.props.history.push({
      pathname: '/events'
    })
  }

  render() {
    // console.log(this.props.curr_event.curr_event);
    console.log(this.props.curr_event);
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

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
