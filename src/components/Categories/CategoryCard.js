import React, { Component } from 'react'

class CategoryCard extends Component {

  state = {
    hover: false
  }

  toggleHover = () => {
    this.setState({
      hover: !this.state.hover
    })
  }

  render() {
    // const background = {
    //   backgroundImage: `url(${this.props.img})`,
    //   backgroundRepeat: 'no-repeat',
    //   backgroundSize: 'cover'
    // }
    let background;
    if (this.state.hover) {
      background = {
        backgroundImage: `url(${this.props.img})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        maxWidth: '100%',
        transition: '.35s',
        transitionTimingFunction: 'ease-in',
        transform: 'scale(1.1)'
      }
    } else {
      background = {
        backgroundImage: `url(${this.props.img})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        transition: '.35s',
        transitionTimingFunction: 'ease-in',
        transform: 'scale(1)',
        width: '100%'
      }
    }
    return (
      <div className="card" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
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
