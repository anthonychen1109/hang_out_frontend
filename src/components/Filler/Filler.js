import React, { Component } from 'react';
import UserModal from '../UserModal/Usermodal';
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

class Filler extends Component {
    state = {
        registered: ''
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

    handleSubmit = () => {
      this.props.history.push({
        pathname: '/events'
      })
    }

    render() {
        return (
            <div className="filler">
                <div className="overlay">
                    <div className="fillerDiv">
                        <h1>Do more of what you love with Hang Outs</h1>
                        {
                          this.props.hasToken
                          ? <Button
                              inverted color="blue"
                              onClick={this.handleSubmit}>
                              See Events
                          </Button>
                          : <UserModal
                            setToken={this.props.setToken}
                            registered={this.state.registered}
                            register={this.register}
                            login={this.login}
                            />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Filler);
