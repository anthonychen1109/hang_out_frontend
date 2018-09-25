import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import StartOwn from '../StartOwn/StartOwn';
import { getCategory } from './actions';

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

class Categories extends Component {

  renderCategories = () => {
    return this.props.categories.categories.map( (category, index) =>
      <Link to={`/categories/${category.id}`}><CategoryCard
        key={index}
        name={category.name}
        img={category.cat_img}
        /></Link>
    )
  }

    render() {
      console.log(this.props.categories.categories);
        return (
            <div className="categories">
                <div className="categoriesDiv container">
                    <h1>Explore by Category</h1>
                    <div className="categoriesCards">
                      { this.renderCategories() }
                    </div>
                </div>
                <StartOwn />
            </div>
        )
    }
}

export default connect(mapStateToProps)(Categories);
