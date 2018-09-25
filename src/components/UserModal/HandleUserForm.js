import React, { Component } from 'react'
import { Form, Input } from 'semantic-ui-react'
import UserPage from '../UserPage/UserPage';

class HandleUserForm extends Component {

    state = {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        showPage: false
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
      console.log(newUser);
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
          this.setState({
            username: json.username
          }, () => console.log );
        });
    }

    handleRegister = (e) => {
      e.preventDefault();
      if (this.state.password !== this.state.confirmPassword) {
      console.log('no match');
      alert('passwords do not match')
      } else {
      const newUser = {
          username: this.state.username,
          password: this.state.password,
      }
       fetch('http://127.0.0.1:8000/api/users/', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(newUser)
       })
         .then(res => res.json())
         .then(json => {
           localStorage.setItem('token', json.token);
           this.setState({
             username: json.username
           })
         }, this.showPage)
      }
    }

    showPage = () => {
      this.setState({
        showPage: true
      })
    }

    createdUser = () => {
        this.setState({
        userName: '',
        password: '',
        confirmPassword: ''
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
                <button className='ui positive button'>
                Submit
                </button>
            </div>
            </Form>

            : <Form onSubmit={this.handleRegister}>
            <h1>Register</h1>
            <Form.Field>
                <label><p className="formInputs">User Name</p></label>
                <Input type='text' placeholder="User Name" name="username" onChange={this.handleChange}/>
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

export default HandleUserForm
