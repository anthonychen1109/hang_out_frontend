import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GroupCard from './GroupCard';
import GroupFiller from './GroupFiller';
import StartOwn from '../StartOwn/StartOwn';
import { getGroups } from './actions';
import { getCategory } from '../Categories/actions';

const mapStateToProps = (state) => {
  return {
    groups: state.groups,
    category: state.category
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGroups: (id) => dispatch(getGroups(id)),
    getCategory: (id) => dispatch(getCategory(id))
  }
}

class Group extends Component {

  state = {
    hasToken: ''
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    if (localStorage.getItem("token")) {
      this.setState({ hasToken: true })
    }
    const path = this.props.location.pathname.split('/')
    const searchPath = path[2]
    // console.log("PATH", path[2]);
    // this.props.getGroups(path)
    this.props.getCategory(searchPath)
  }

  renderGroups = () => {
    if (this.props.category.category.groups) {
      console.log(this.props.category.category.groups);
      if (this.props.category.category.groups == 0) {
        return (
          <div className="groupStart">
            <div>
              <h1>Currently no groups</h1>
            </div>
            <div className="groupStartLink">
              <span className="navbarNewGroup">
                <Link to='/new_group'>Start a new group</Link>
              </span>
            </div>
          </div>
        )
      } else if (this.props.groups.groups.length === 1) {
        return <GroupCard group={this.props.category.category.groups[0]}/>
      } else {
        return this.props.category.category.groups.map( (group, index) => {
          return <GroupCard key={index} category={this.props.category} group={group}/>
        })
      }
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

  render() {
    // console.log(this.props.location.pathname[0]);
    console.log(this.props.category);
    return (
      <div>
        <Navbar setToken={this.setToken} deleteToken={this.deleteToken} hasToken={this.state.hasToken}/>
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

export default connect(mapStateToProps, mapDispatchToProps )(Group);
