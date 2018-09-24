import React, { Component } from 'react'
import { Button, Dimmer, Header, Icon } from 'semantic-ui-react'
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
                    color="red"
                    onClick={this.handleRegister}>
                    Sign Up
                </Button>
                <Dimmer active={active} onClickOutside={this.handleClose} page>
                <Header as='h2' icon inverted>
                    <HandleUserForm
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