import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGroup } from './actions';
import Navbar from '../Navbar/Navbar';

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

  componentDidMount() {
    this.props.getGroup(this.props.location.state.id)
  }

  renderGroup = () => {
    return this.props.group.name
  }

  render() {
    console.log(this.props.group.group.group_img);
    return (
      <div>
        <Navbar/>
        <hr/>
        <div className="groupInfoFiller container">
          <div className="groupInfoImage">
            <img src={this.props.group.group.group_img} alt="group image"/>
          </div>
          <div className="groupInfoContent">
            <h1>{this.props.group.group.name}</h1>
            <p>{this.props.group.group.num_users} members</p>
            <p>organized by {this.props.group.group.organizer_name}</p>
          </div>
        </div>
        <hr/>
        <div className="groupInfoAbout container">
          <div className="groupInfoLeft">
            <h1>What we're about</h1>
            <p>{this.props.group.group.description}</p>
          </div>
          <div className="groupInfoRight">
            <h1>Upcoming Hang Outs</h1>
            <div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupInfo);
