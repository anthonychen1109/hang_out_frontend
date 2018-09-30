import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvents, getUserInfo } from './actions';
import Navbar from '../Navbar/Navbar';
import StartOwn from '../StartOwn/StartOwn';

const mapStateToProps = (state) => {
  return {
    events: state.events
    // userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEvents: () => dispatch(getEvents())
    // getUserInfo: (id) => dispatch(getUserInfo(id))
  }
}

class EventDetail extends Component {

  state = {
    hasToken: ''
  }

  componentDidMount() {
    this.props.getEvents()
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

  render() {
    // NEED TO FETCH PARTICULAR EVENT
    console.log(this.props.events);
    return (
      <div>
        <Navbar setToken={this.setToken} deleteToken={this.deleteToken} hasToken={this.state.hasToken}/>
        <StartOwn />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
