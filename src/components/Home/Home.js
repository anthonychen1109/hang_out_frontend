import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories } from './actions';
import Categories from '../Categories/Categories';
import Navbar from '../Navbar/Navbar';
import Filler from '../Filler/Filler';

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {getCategories: () => dispatch(getCategories())}
}

class Home extends Component {

    componentDidMount() {
        this.props.getCategories()
    }

    render() {
        return (
            <div>
                <Navbar />
                <hr />
                <Filler />
                <Categories />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
