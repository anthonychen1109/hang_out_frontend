import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../Categories/actions';
import Categories from '../Categories/Categories';
import Navbar from '../Navbar/Navbar';
import Filler from '../Filler/Filler';

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

class Home extends Component {

  state = {
    hasToken: ''
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
        <Navbar
          setToken={this.setToken} hasToken={this.state.hasToken}
          deleteToken={this.deleteToken}
        />
        <hr/>
        <Filler setToken={() => this.setToken()} hasToken={this.state.hasToken}/>
        <Categories hasToken={this.state.hasToken}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
