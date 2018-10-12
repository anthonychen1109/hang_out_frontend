import React, { Component } from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
import UserPage from '../UserPage/UserPage';
import {withRouter} from "react-router-dom";

class HandleUserForm extends Component {

    state = {
        id: '',
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
      e.preventDefault();
      const newUser = {
          username: this.state.username,
          password: this.state.password,
      }
      fetch('https://hang-out-backend.herokuapp.com/token-auth/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })
        .then(res => res.json())
        .then(json => {
          if (json.user) {
          localStorage.setItem('token', json.token);
          this.props.setToken()
            this.setState({
              userLoggedIn: true,
              id: json.user.id,
              username: json.user.username,
              first_name: json.user.first_name,
              last_name: json.user.last_name
            }, () => this.loggedInUser(this.state));
          } else {

            alert('Invalid Login')
          }
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
       try {
         fetch('https://hang-out-backend.herokuapp.com/api/users/', {
           method: 'POST',
           headers: {
             'Accept': 'application/json',
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
               username: json.username,
               first_name: json.first_name,
               last_name: json.last_name
             }, () => this.signedUpUser(newUser))
           })
       } catch(error) {
        console.log(error);
       }
      }
    }

    signedUpUser = (user) => {
      this.props.handleClose()
      this.props.history.push({
        pathname: '/welcome',
        state: {
          registered: true,
          id: this.state.id,
          username: this.state.username,
          first_name: this.state.first_name,
          last_name: this.state.last_name
        }
      })
    }

    loggedInUser = (user) => {
        this.props.handleClose()
        this.props.history.push({
          pathname: '/events',
          state: {
            registered: true,
            id: this.state.id,
            username: this.state.username,
            first_name: this.state.first_name,
            last_name: this.state.last_name
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
                  <Form.Button content='Submit' />
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
                    <li className="formInputsPWmsg">Password must be 8 characters or longer</li>
                    <Input type='password' placeholder="Password" name="password" onChange={this.handleChange}/>
                </Form.Field>

                <Form.Field>
                    <label><p className="formInputs">Confirm Password</p></label>
                    <Input type='password' placeholder="Confirm Password" name="confirmPassword" onChange={this.handleChange}/>
                </Form.Field>
                <div className='ui buttons'>
                    <Form.Button content='Submit' />
                </div>
              </Form>
        )
    }

}

export default withRouter(HandleUserForm);
