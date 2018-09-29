import React, { Component } from 'react'

class CategoryCard extends Component {
  render() {
    const background = {
      backgroundImage: `url(${this.props.img})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }
    return (
      <div className="card">
        <div className="card-img-top" style={background}>
        </div>
        <div className="card-body">
          <p className="card-text">{this.props.name}</p>
        </div>
      </div>
    )
  }
}

export default CategoryCard;
