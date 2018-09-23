import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories } from './actions';
import Categories from '../Categories/Categories';
import Navbar from '../Navbar/navbar';
import Filler from '../Filler/Filler';

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    getCategories: () => dispatch(getCategories())
}

class Home extends Component {

    state = {
        categories: []
    }

    componentDidMount() {
        // this.props.getCategories()
        fetch('http://127.0.0.1:8000/api/v1/categories/')
        .then( r => r.json() )
        .then( console.log )
    }

    render() {
        console.log(this.state.categories)
        return (
            <div>
                <Navbar />
                <hr />
                <Filler />
                <Categories/>
            </div>
        )
    }
}

export default connect(mapStateToProps, {getCategories})(Home);