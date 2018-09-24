import React, { Component } from 'react'
import { Form, Input, TextArea, Button } from 'semantic-ui-react'

class HandleUserForm extends Component {

    state = {
        userName: '',
        password: '',
        confirmPassword: '',
        email: ''
    }

    handleChange = (e) => {
        e.persist()
        this.setState({
        [e.target.name]: e.target.value
        })
    }

    handleLogin = () => {
        const newUser = {
            username: this.state.userName,
            password: this.state.password
        }
        fetch('http://127.0.0.1:8000/api/v1/rest-auth/login/', {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(newUser)
        }).then( resp => resp.json() )
        .then(this.loggedInUser())
    }

    handleRegister = () => {
        if (this.state.password !== this.state.confirmPassword) {
        console.log('no match');
        alert('passwords do not match')
        } else {
        const newUser = {
            username: this.state.userName,
            email: this.state.email,
            password1: this.state.password,
            password2: this.state.confirmPassword
        }
        fetch('http://127.0.0.1:8000/api/v1/rest-auth/registration/', {
            method: "POST",
            headers:{
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then( resp => resp.json() )
        .then(this.createdUser)
        }
    }

    createdUser = () => {
        this.setState({
        userName: '',
        password: '',
        confirmPassword: '',
        email: ''
        })
        this.props.handleClose()
    }

    loggedInUser = () => {
        this.setState({
        userName: '',
        password: ''
        })
        this.props.handleClose()
    }

    render() {
        return (
        this.props.registered
            ? <Form onSubmit={this.handleLogin}>
            <h1>Login</h1>
            <Form.Field>
                <label><p className="formInputs">User Name</p></label>
                <Input type='text' placeholder="User Name" name="userName"/>
            </Form.Field>

            <Form.Field>
                <label><p className="formInputs">Enter Password</p></label>
                <Input type='password' placeholder="Password" name="password"/>
            </Form.Field>

            <div className='ui buttons'>
                <button className='ui button' role='button' onClick={this.props.handleClose}>
                Cancel
                </button>
                <div />
                <button className='ui positive button' role='button'>
                Submit
                </button>
            </div>
            </Form>

            : <Form onSubmit={this.handleRegister}>
            <h1>Register</h1>
            <Form.Field>
                <label><p className="formInputs">User Name</p></label>
                <Input type='text' placeholder="User Name" name="userName" onChange={this.handleChange}/>
            </Form.Field>

            <Form.Field>
                <label><p className="formInputs">Email</p></label>
                <Input type='text' placeholder="Email" name="email" onChange={this.handleChange}/>
            </Form.Field>

            <Form.Field>
                <label><p className="formInputs">Enter Password</p></label>
                <li>Password must be 8 characters or longer</li>
                <Input type='password' placeholder="Password" name="password" onChange={this.handleChange}/>
            </Form.Field>

            <Form.Field>
                <label><p className="formInputs">Confirm Password</p></label>
                <Input type='password' placeholder="Confirm Password" name="confirmPassword" onChange={this.handleChange}/>
            </Form.Field>

            <div className='ui buttons'>
                <button className='ui button' role='button' onClick={this.props.handleClose}>
                Cancel
                </button>
                <div />
                <button className='ui positive button' role='button'>
                Submit
                </button>
            </div>
            </Form>
        )
    }

}

export default HandleUserForm