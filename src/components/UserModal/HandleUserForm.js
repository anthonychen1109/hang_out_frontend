import React, { Component } from 'react'
import { Form, Input } from 'semantic-ui-react'
import UserPage from '../UserPage/UserPage';
import {withRouter} from "react-router-dom";

class HandleUserForm extends Component {

    state = {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        first_name: '',
        last_name: '',
        userLoggedIn: false
    }

    handleChange = (e) => {
        e.persist()
        this.setState({
        [e.target.name]: e.target.value
        })
    }

    handleLogin = (e) => {

      console.log('hi');
      e.preventDefault();
      const newUser = {
          username: this.state.username,
          password: this.state.password,
      }
      fetch('http://localhost:8000/token-auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })
        .then(res => res.json())
        .then(json => {
          localStorage.setItem('token', json.token);
          this.props.setToken()
          this.setState({
            userLoggedIn: true,
            username: json.username
          }, this.loggedInUser);
        });
    }

    handleRegister = (e) => {
      e.preventDefault();
      if (this.state.password !== this.state.confirmPassword) {
      alert('passwords do not match')
      } else {
      const newUser = {
          username: this.state.username,
          password: this.state.password,
          first_name: this.state.first_name,
          last_name: this.state.last_name
      }
       fetch('http://localhost:8000/api/users/', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(newUser)
       })
         .then(res => res.json())
         .then(json => {
           localStorage.setItem('token', json.token);
           this.props.setToken()
           this.setState({
             userLoggedIn: true,
             username: json.username
           }, this.loggedInUser)
         })
      }
    }

    createdUser = () => {
        this.setState({
        username: '',
        password: '',
        first_name: '',
        last_name: ''
        })
        this.props.handleClose()
    }

    loggedInUser = () => {
        this.setState({
        userName: '',
        password: '',
        first_name: '',
        last_name: ''
        })
        this.props.handleClose()
        this.props.history.push({
          pathname: '/events',
          state: {
            registered: true
          }
        })
    }

    render() {
        return (
        this.props.registered
            ? <Form className="loginForm" onSubmit={this.handleLogin}>
            <h1>Login</h1>
            <Form.Field>
                <label><p className="formInputs">User Name</p></label>
                <Input type='text' placeholder="User Name" name="username" onChange={this.handleChange}/>
            </Form.Field>

            <Form.Field>
                <label><p className="formInputs">Enter Password</p></label>
                <Input type='password' placeholder="Password" name="password" onChange={this.handleChange}/>
            </Form.Field>

            <div className='ui buttons'>
                <button className='ui button' onClick={this.props.handleClose}>
                Cancel
                </button>
                <div />
                <button type='submit' className='ui positive button'>
                Submit
                </button>
            </div>
            </Form>

            : <Form className="registerForm" onSubmit={this.handleRegister}>
            <h1>Register</h1>
            <Form.Field>
                <label><p className="formInputs">User Name</p></label>
                <Input type='text' placeholder="User Name" name="username" onChange={this.handleChange}/>
            </Form.Field>

            <Form.Field>
                <label><p className="formInputs">First Name</p></label>
                <Input type='text' placeholder="First Name" name="first_name" onChange={this.handleChange}/>
            </Form.Field>

            <Form.Field>
                <label><p className="formInputs">Last Name</p></label>
                <Input type='text' placeholder="Last Name" name="last_name" onChange={this.handleChange}/>
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
                <button className='ui button' onClick={this.props.handleClose}>
                Cancel
                </button>
                <div />
                <button className='ui positive button'>
                Submit
                </button>
            </div>
            </Form>
        )
    }

}

export default withRouter(HandleUserForm);
