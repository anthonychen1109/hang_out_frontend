import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { getCategories } from '../Categories/actions';
import Categories from '../Categories/Categories';
import Navbar from '../Navbar/Navbar';
import Filler from '../Filler/Filler';
import Bs from './bs';

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
    hasToken: false,
    redirect: false
  }

  componentDidMount() {
    this.props.getCategories()
    if (localStorage.getItem("token")) {
      this.setState({ hasToken: true })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentdid udpate');
    const token = localStorage.getItem("token")
      if (!prevState.hasToken && token) {
        this.setState({ hasToken: true })
      }
  }

  setToken = () => {
    const token = localStorage.getItem("token")
    if (token) {
      this.setState({
        hasToken: true,
        redirect: true
      })
    }
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  render() {
    console.log(this.state.hasToken);
    return this.state.hasToken
    ? <Bs />
    : <div>
        <Navbar setToken={() => this.setToken()}/>
        <hr />
        <Filler setToken={() => this.setToken()}/>
        <Categories />
      </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
