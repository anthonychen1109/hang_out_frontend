import React, { Component } from 'react';
import Signup from '../Signup/Signup';
import UserModal from '../UserModal/Usermodal';

class Filler extends Component {
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
    render() {
        return (
            <div className="filler">
                <div className="overlay">
                    <div className="fillerDiv">
                        <h1>Do more of what you love with hang outs</h1>
                        <UserModal
                            registered={this.state.registered}
                            register={this.register}
                            login={this.login}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Filler;