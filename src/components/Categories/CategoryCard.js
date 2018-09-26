import React, { Component } from 'react'

class CategoryCard extends Component {
  render() {
    return (
      <div className="card">
        <img className="card-img-top" src={this.props.img} alt="Card image cap"/>
        <div className="card-body">
          <p className="card-text">{this.props.name}</p>
        </div>
      </div>
    )
  }
}

export default CategoryCard;
