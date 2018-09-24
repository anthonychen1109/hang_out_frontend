import React, { Component } from 'react'

class CategoryCard extends Component {
  render() {
    return (
      <div class="card">
        <img class="card-img-top" src={this.props.img} alt="Card image cap"/>
        <div class="card-body">
          <p class="card-text">{this.props.name}</p>
        </div>
      </div>
    )
  }
}

export default CategoryCard;
