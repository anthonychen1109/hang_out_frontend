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

const mapDispatchToProps = (dispatch) => {
  return {
    getCategory: (category) => dispatch(getCategory(category))
  }
}

class Categories extends Component {

  renderCategories = () => {
    return this.props.categories.categories.map( (category, index) =>
      <Link key={index} to={`/categories/${category.id}`} onClick={() => this.props.getCategory(category.id)}>
        <CategoryCard
        name={category.name}
        img={category.cat_img}
        />
    </Link>
    )
  }

    render() {
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

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
