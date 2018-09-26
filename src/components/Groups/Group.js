import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    category: state.category
  }
}

class Group extends Component {

  renderGroups = () => {
    return
  }

  render() {
    return (
      <div>
        <Navbar />
        <hr />
      </div>
    )
  }
}

export default connect(mapStateToProps)(Group);
