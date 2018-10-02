import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'
import HandleGroupForm from './HandleGroupForm';
import { getGroups } from './actions';

const mapStateToProps = (state) => {
  return {
    groups: state.groups
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGroups: (id) => dispatch(getGroups(id))
  }
}

class GroupCard extends Component {

  state = {}

  handleGroup = (id) => {
    this.props.history.push({
      pathname: `/group/${id}`,
      state: {
        id: id
      }
    })
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
            {
              this.props.group.num_users.length > 1
              ? <p className="groupCardUsers card-text">{this.props.group.num_users} Members</p>
              : <p className="groupCardUsers card-text">{this.props.group.num_users} Member</p>
            }
              <Button
                  className="groupCardBtn"
                  inverted color="blue"
                  onClick={() => this.handleGroup(this.props.group.id)}>
                  See Details
              </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupCard));
