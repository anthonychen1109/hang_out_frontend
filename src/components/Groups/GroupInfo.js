import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGroup } from './actions';
import Navbar from '../Navbar/Navbar';

const mapStateToProps = (state) => {
  return {
    group: state.group
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGroup: (id) => dispatch(getGroup(id))
  }
}

class GroupInfo extends Component {

  componentDidMount() {
    this.props.getGroup(this.props.location.state.id)
  }

  renderGroup = () => {
    return this.props.group.name
  }

  render() {
    return (
      <div>
        <Navbar/>
        {this.renderGroup()}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupInfo);
