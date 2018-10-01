import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../Categories/actions';
import Navbar from '../Navbar/Navbar';
import CreateGroupFiller from './CreateGroupFiller';
import Categories from '../Categories/Categories';
import StartOwn from '../StartOwn/StartOwn';

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

class CreateGroup extends Component {

  state = {
    hasToken: '',
    stepOneButton: true,
    stepTwo: '',
    stepTwoButton: true,
    stepThree: '',
    stepThreeButton: true,
    stepFour: '',
    stepFourButton: true,
    hometown: '',
    hangOutName: '',
    description: ''
  }

  componentDidMount() {
    this.props.getCategories()
    if (localStorage.getItem("token")) {
      this.setState({ hasToken: true })
    }
  }

  setToken = () => {
    const token = localStorage.getItem("token")
    if (token) {
      this.setState({
        hasToken: true
      })
    }
  }

  deleteToken = () => {
    const token = localStorage.removeItem("token")
    if (token) {
      this.setState({
        hasToken: false
      })
    }
  }

  handleData = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  stepOne = () => {
    return (
      <div className="stepOne">
        <div>
          <img className="formImage" src="https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" alt="globe"/>
        </div>
        <div className="stepOneHometown">
          <p>STEP 1 OF 4</p>
          <h1>What's your new Hang Out's hometown?</h1>
          <input type="text" name="hometown" value={this.state.hometown} onChange={this.handleData}/>
          <button className="nextBtn btn btn-primary" disabled={!this.state.stepOneButton} onClick={this.allowStepTwo}>Next</button>
        </div>
      </div>
    )
  }

  allowStepTwo = () => {
    if (this.state.hometown.length > 0) {
      this.setState({
        stepOneButton: false,
        stepTwo: true
      })
    } else {
      alert('Hometown must not be empty')
    }
  }

  stepTwo = () => {
    return (
      this.state.stepTwo
      ? <div className="stepOne">
        <div>
          <img className="formImage" src="https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" alt="speech"/>
        </div>
        <div className="stepOneHometown">
          <p>STEP 2 OF 4</p>
          <h1>What will your Hang Out be about?</h1>
            <select name="" id="">
              {this.props.categories.categories.map( (category, index) => <option key={index} value="">{category.name}</option>)}
            </select>
          <button className="nextBtn btn btn-primary" disabled={!this.state.stepTwoButton} onClick={this.allowStepThree}>Next</button>
        </div>
      </div>
      : null
    )
  }

  allowStepThree = () => {
    this.setState({
      stepTwoButton: false,
      stepThree: true
    })
  }

  stepThree = () => {
    return (
      this.state.stepThree
      ? <div className="stepOne">
        <div>
          <img className="formImage" src="https://images.pexels.com/photos/998501/pexels-photo-998501.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" alt="tag"/>
        </div>
        <div className="stepOneHometown">
          <p>STEP 3 OF 4</p>
          <h1>What will your Hang Out's name be?</h1>
          <input type="text" value={this.state.hangOutName} name="hangOutName" onChange={this.handleData}/>
          <h1>Describe who should join, and what your Hang Out will do.</h1>
          <textarea type="text" rows="5" value="description" name="description" onChange={this.handleData}></textarea>
          <button className="nextBtn btn btn-primary" disabled={!this.state.stepThreeButton} onClick={this.allowStepFour}>Next</button>
        </div>
      </div>
      : null
    )
  }

  allowStepFour = () => {
    if (this.state.hangOutName.length > 0 && this.state.description.length > 0) {
      this.setState({
        stepThreeButton: false,
        stepFour: true
      })
    } else {
      alert('Hang Out Name and/or Description must not be empty')
    }
  }

  stepFour = () => {
    return (
      this.state.stepFour
      ? <div className="stepOne">
        <div>
          <img className="formImage" src="https://images.pexels.com/photos/160731/smilies-bank-sit-rest-160731.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" alt="smiley"/>
        </div>
        <div className="stepOneHometown">
          <p>STEP 4 OF 4</p>
          <h1>What it means to be a Hang Out</h1>
          <ul>
            <li>Real, in-person conversations</li>
            <li>Open and honest intentions</li>
            <li>Always safe and respectful</li>
            <li>Put your members first</li>
          </ul>
          <button className="nextBtn btn btn-primary">CONFIRM</button>
        </div>
      </div>
      : null
    )
  }

  createForm = () => {
    return (
      <div className="ui form startGroupForm">
        <div>
          <div>
            {this.stepOne()}
          </div>
          <div>
            {this.stepTwo()}
          </div>
          <div>
            {this.stepThree()}
          </div>
          <div>
            {this.stepFour()}
          </div>
        </div>
      </div>
    )
  }

  allowCreate = () => {
    return (
      <div>
        <div className="createForm container">
          <div className="createFormHeader">
            <h1>Start a new group!</h1>
          </div>
          <div className="createFormForm">
            {this.createForm()}
          </div>
        </div>
      </div>
    )
  }

  doNotAllowCreate = () => {
    return (
      <div>
        <Categories />
      </div>
    )
  }

  handleSubmit = () => {
    const newGroup = {

    }
  }

  render() {
    console.log(this.state.hometown);
    return (
      <div>
        <Navbar setToken={this.setToken} deleteToken={this.deleteToken} hasToken={this.state.hasToken}/>
        <CreateGroupFiller hasToken={this.state.hasToken}/>
        <form onSubmit={this.handleSubmit}>
          {
            this.state.hasToken
            ? this.allowCreate()
            : this.doNotAllowCreate()
          }
        </form>
        <StartOwn />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
