import React, { Component } from 'react';
import { Button, Dimmer, Header } from 'semantic-ui-react'
import HandleGroupForm from './HandleGroupForm';

class GroupCard extends Component {

  state = {}

  handleOpen = () => {
      this.setState({ active: true })
  }

  handleClose = () => {
      this.setState({ active: false })
  }

  render() {
    const { active } = this.state
    const background = this.props.group.group_img
    return (
      <div
        className="groupCard card"
        style={{backgroundImage: `url(${background})`, backgroundSize: 'cover'}}
        onClick={this.getGroup}
        >
        <div className="overlay">
          <div className="groupCardBody card-body">
            <h3 className="groupCardName card-title">{this.props.group.name}</h3>
            <p className="groupCardUsers card-text">{this.props.group.num_users} Member(s)</p>
              <Button
                  className="groupCardBtn"
                  inverted color="blue"
                  onClick={this.handleOpen}>
                  See Details
              </Button>
              <Dimmer active={active} onClickOutside={this.handleClose} page>
              <Header as='h2' icon inverted>
                  <HandleGroupForm
                    background={this.props.group.group_img}
                    name={this.props.group.name}
                    numUsers={this.props.group.num_users}
                    description={this.props.group.description}
                    />
              </Header>
              </Dimmer>
          </div>
        </div>
      </div>
    )
  }
}

export default GroupCard;
