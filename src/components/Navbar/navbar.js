import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Dimmer, Header } from 'semantic-ui-react'
import HandleUserForm from '../UserModal/HandleUserForm';

class Navbar extends Component {
    state = {
        registered: false
    }

    register = () => {
        this.setState({
            registered: false
        })
    }

    login = () => {
        this.setState({
            registered: true
        })
    }

    handleOpen = () => {
        this.setState({ active: true })
    }

    handleClose = () => {
        this.setState({ active: false })
    }

    handleRegister = () => {
        this.register()
        this.handleOpen()
    }

    handleLogin = () => {
        this.login()
        this.handleOpen()
    }

    handleLogout = () => {
      this.props.deleteToken()
      return <Redirect to='/' />
    }

    render() {
        const { active } = this.state
        return (
          this.props.hasToken
          ?
            <div className="navbar">
                <div className="navbarLogo">
                    <Link to="/"><h1>Hang Outs</h1></Link>
                </div>
                <div className="navbarOptions">
                    <span className="navbarNewGroup"><Link to='/new_group'>Start a new group</Link> |</span>
                    <Button
                        className="LogoutBtn"
                        basic color='red'
                        onClick={this.handleLogout}>
                        Log Out
                    </Button>
                </div>
                <Dimmer active={active} onClickOutside={this.handleClose} page>
                    <Header as='h2' icon inverted>
                        <HandleUserForm
                            setToken={this.props.setToken}
                            handleOpen={this.handleOpen}
                            handleClose={this.handleClose}
                            registered={this.state.registered}
                        />
                    </Header>
                </Dimmer>
            </div>
            :
            <div className="navbar">
                <div className="navbarLogo">
                    <Link to="/"><h1>Hang Outs</h1></Link>
                </div>
                <div className="navbarOptions">
                    <span className="navbarNewGroup"><Link to='/new_group'>Start a new group</Link> |</span>
                    <Button
                        className="registerLoginBtn"
                        basic color='blue'
                        onClick={this.handleRegister}>
                        Sign Up
                    </Button>
                    <Button
                        className="registerLoginBtn"
                        onClick={this.handleLogin}
                        basic color='blue'>
                        Login
                    </Button>
                </div>
                <Dimmer active={active} onClickOutside={this.handleClose} page>
                    <Header as='h2' icon inverted>
                        <HandleUserForm
                            setToken={this.props.setToken}
                            handleOpen={this.handleOpen}
                            handleClose={this.handleClose}
                            registered={this.state.registered}
                        />
                    </Header>
                </Dimmer>
            </div>
        )
    }
}

export default Navbar;
