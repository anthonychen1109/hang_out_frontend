import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvents } from './actions';
import Navbar from '../Navbar/Navbar';

const mapStateToProps = (state) => {
  return {
    events: state.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEvents: () => dispatch(getEvents())
  }
}

class Events extends Component {

  componentDidMount() {
    this.props.getEvents()
  }

  render() {
    console.log(this.props.events);
    return (
      <div>
        <Navbar />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);
