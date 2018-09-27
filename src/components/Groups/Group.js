import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GroupCard from './GroupCard';
import GroupFiller from './GroupFiller';
import StartOwn from '../StartOwn/StartOwn';

const mapStateToProps = (state) => {
  return {
    groups: state.groups,
    category: state.category
  }
}

class Group extends Component {

  renderGroups = () => {
    if (this.props.groups.groups.length === 0) {
      return <div><span className="navbarNewGroup"><Link to='/new_group'>Start a new group</Link></span></div>
    } else if (this.props.groups.groups.length === 1) {
      return <GroupCard group={this.props.groups.groups[0]}/>
    } else {
      return this.props.groups.groups.map( (group, index) => {
        return <GroupCard key={index} category={this.props.category} group={group}/>
      })
    }
  }



  render() {
    return (
      <div>
        <Navbar />
        <hr />
        <GroupFiller />
        <div className="groupDiv container">
          {this.renderGroups()}
        </div>
        <StartOwn />
      </div>
    )
  }
}

export default connect(mapStateToProps)(Group);
