import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoryCard from './CategoryCard';

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

class Categories extends Component {

  renderCategories = () => {
    return this.props.categories.categories.map( (category, index) => <CategoryCard key={index} name={category.name} img={category.cat_img}/> )
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
            </div>
        )
    }
}

export default connect(mapStateToProps)(Categories);
