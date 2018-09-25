import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import { connect } from 'react-redux';

class Group extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <hr />
      </div>
    )
  }
}

export default connect()(Group);
