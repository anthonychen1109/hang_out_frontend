import React, { Component } from 'react'
import { Button, Dimmer, Header } from 'semantic-ui-react'
import HandleUserForm from './HandleUserForm';

export default class UserModal extends Component {
    state = {}

    handleOpen = () => {
        this.setState({ active: true })
    }

    handleClose = () => {
        this.setState({ active: false })
    }

    handleRegister = () => {
        this.props.register()
        this.handleOpen()
    }

    handleLogin = () => {
        this.props.login()
        this.handleOpen()
    }

    render() {
        const { active } = this.state
        return (
            <div>
                <Button
                    className="registerLoginBtn"
                    inverted color="blue"
                    onClick={this.handleRegister}>
                    Sign Up
                </Button>
                <Dimmer active={active} onClickOutside={this.handleClose} page>
                <Header as='h2' icon inverted>
                    <HandleUserForm
                        setToken={this.props.setToken}
                        handleOpen={this.handleOpen}
                        handleClose={this.handleClose}
                        registered={this.props.registered}
                    />
                </Header>
                </Dimmer>
            </div>
        )
    }
}
