import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../Categories/actions';
import { getAllGroups } from '../Groups/actions';
import Navbar from '../Navbar/Navbar';
import EventsFiller from './EventsFiller';
import Categories from '../Categories/Categories';
import StartOwn from '../StartOwn/StartOwn';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        allGroups: state.allGroups
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getCategories: () => dispatch(getCategories()),
      // getGroups: () => dispatch(getGroups()),
      getAllGroups: () => dispatch(getAllGroups())
    }
}

class CreateEvent extends Component {

  state = {
    user_id: '',
    username: '',
    first_name: '',
    last_name: '',
    hasToken: '',
    stepOneButton: true,
    stepTwo: '',
    stepTwoButton: true,
    stepThree: '',
    stepThreeButton: true,
    stepFour: '',
    stepFourButton: true,
    name: '',
    address: '',
    city: '',
    country: '',
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Euismod lacinia at quis risus sed vulputate odio. Vulputate eu scelerisque felis imperdiet proin. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Imperdiet proin fermentum leo vel. Gravida quis blandit turpis cursus in hac. Egestas sed tempus urna et. Eget egestas purus viverra accumsan in nisl. Nec sagittis aliquam malesuada bibendum arcu. Facilisi etiam dignissim diam quis. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Nisl vel pretium lectus quam id leo in vitae turpis. Donec adipiscing tristique risus nec feugiat. Elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi. Accumsan tortor posuere ac ut.',
    group: 1,
    event_img: 'https://images.pexels.com/photos/693859/pexels-photo-693859.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350'
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.props.getAllGroups()
    if (localStorage.getItem("token")) {
      this.getUser()
      this.setState({ hasToken: true })
    }
  }

  getUser = () => {
    fetch('http://localhost:8000/api/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          console.log(json)
          this.setState({
            user_id: json.id,
            hasToken: true,
            username: json.username,
            first_name: json.first_name,
            last_name: json.last_name
          })
        })
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

  handleChange = (e) => {
    this.setState({ group: e.target.value })
  }

  stepOne = () => {
    return (
      <div className="stepOne">
        <div>
          <img className="formImage" src="https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" alt="globe"/>
        </div>
        <div className="stepOneHometown">
          <p>STEP 1 OF 4</p>
          <h1>What's the name of your new Hang Out's?</h1>
          <input type="text" name="name" value={this.state.name} onChange={this.handleData}/>
          <h1>Address</h1>
          <input type="text" name="address" value={this.state.address} onChange={this.handleData}/>
          <h1>City</h1>
          <input type="text" name="city" value={this.state.city} onChange={this.handleData}/>
          <h1>Country</h1>
          <input type="text" name="country" value={this.state.country} onChange={this.handleData}/>
          <button className="nextBtn btn btn-primary" disabled={!this.state.stepOneButton} onClick={this.allowStepTwo}>Next</button>
        </div>
      </div>
    )
  }

  allowStepTwo = () => {
    if (this.state.name.length > 0 && this.state.address.length > 0 && this.state.city.length > 0 && this.state.country.length > 0) {
      this.setState({
        stepOneButton: false,
        stepTwo: true
      })
    } else {
      alert('Fields must not be empty')
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
          <h1>Select a group for your event</h1>
            <select onChange={this.handleChange} name="" id="">
              <option disabled selected value> -- select an option -- </option>
              {this.props.allGroups.groups.map( (group, index) => <option key={index} value={group.id}>{group.name}</option>)}
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
          <h1>Upload a picture for your event</h1>
          <textarea type="text" rows="5" value={this.state.event_img} name="event_img" onChange={this.handleData}></textarea>
          <h1>Describe what this event is about</h1>
          <textarea type="text" rows="5" value={this.state.details} name="details" onChange={this.handleData}></textarea>
          <button className="nextBtn btn btn-primary" disabled={!this.state.stepThreeButton} onClick={this.allowStepFour}>Next</button>
        </div>
      </div>
      : null
    )
  }

  allowStepFour = () => {
    if (this.state.details.length > 0) {
      this.setState({
        stepThreeButton: false,
        stepFour: true
      })
    } else {
      alert('Event description must not be empty')
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

  handleSubmit = (e) => {
    let now = moment.now()
    let formatted = moment(now).format()
    let splitTime = formatted.split('-')
    let formattedTime = `${splitTime[0]}-${splitTime[1]}-${splitTime[2]}Z`
    e.preventDefault()
    const newEvent = {
      name: this.state.name,
      address: this.state.address,
      city: this.state.city,
      country: this.state.country,
      users: [this.state.user_id],
      group_id: this.state.group,
      event_img: this.state.event_img,
      details: this.state.details,
      date: formattedTime
      // category: this.state.category,
      // description: this.state.description,
      // users: [this.state.user_id],
      // group_img: this.state.hangOutImage,
      // organizer_name: this.state.username
    }
    fetch('http://localhost:8000/api/v1/events/', {
      method: "POST",
      body: JSON.stringify(newEvent),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
    // console.log('submit');
    this.props.history.push({
      pathname: "/events"
    })
  }

  render() {
    // console.log(this.state.startDate);
    console.log(this.state.user_id);
    // console.log(this.props.allGroups.groups)
    // this.props.categories.categories.map(category => console.log(category))e
    return (
      <div>
        <Navbar setToken={this.setToken} deleteToken={this.deleteToken} hasToken={this.state.hasToken}/>
        <EventsFiller hasToken={this.state.hasToken}/>
        { !this.state.hasToken && <div className="createEventLoggedIn animated shake" ><h1>MUST BE LOGGED IN TO CREATE EVENT</h1></div> }
        <form onSubmit={(e) => this.handleSubmit(e)}>
          {
            this.state.hasToken
            ? this.allowCreate()
            : this.doNotAllowCreate()
          }
        </form>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateEvent));
