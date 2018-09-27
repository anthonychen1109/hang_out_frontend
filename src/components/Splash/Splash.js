import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';

class Splash extends Component {
    render() {
        return (
            <div className="splashPage">
                <div className="overlay">
                    <div className="splashLogo">
                        <h1 className="splashText">Hang Outs</h1>
                        <Link to="/home">
                        <button type="button" className="btn btn-outline-primary animated bounceInDown">Get Started</button>
                        </Link>
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}

export default Splash;
