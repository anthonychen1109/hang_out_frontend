import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import StartOwn from '../StartOwn/StartOwn';
import { getCategory } from './actions';
import { getGroups } from '../Groups/actions';

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategory: (category) => dispatch(getCategory(category)),
    getGroups: (category) => dispatch(getGroups(category))
  }
}

class Categories extends Component {

  handleGroups = (id) => {
    this.props.getCategory(id)
    this.props.getGroups(id)
  }

  renderCategories = () => {
    return this.props.categories.categories.map( (category, index) =>
      <Link key={index} to={`/categories/${category.id}`} onClick={() => this.handleGroups(category.id)}>
        <CategoryCard
          hasToken={this.props.hasToken}
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
