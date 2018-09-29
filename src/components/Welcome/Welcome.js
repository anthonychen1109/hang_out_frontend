import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { getCategories } from '../Categories/actions';
import Categories from '../Categories/Categories';
import Navbar from '../Navbar/Navbar';
import WelcomeFiller from './WelcomeFiller';
import Events from '../Events/Events';

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getCategories: () => dispatch(getCategories())
    }
}

class Welcome extends Component {

  state = {
    hasToken: false
  }

  componentDidMount() {
    this.props.getCategories()
    if (localStorage.getItem("token")) {
      this.setState({ hasToken: true })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const token = localStorage.getItem("token")
      if (!prevState.hasToken && token) {
        this.setState({ hasToken: true })
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
    return (
      <div>
        <Navbar hasToken={this.props.location.state.registered} deleteToken={this.deleteToken}/>
        <hr />
        <WelcomeFiller
          setToken={() => this.setToken()}
          firstName={this.props.location.state.first_name}
          lastName={this.props.location.state.last_name}
          />
        <Categories hasToken={this.state.hasToken}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
