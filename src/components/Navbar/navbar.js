import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbarLogo">
                <Link to="/"><h1>Hang Outs</h1></Link>
            </div>
            <div className="navbarOptions">
                <span className="navbarNewGroup"><Link to='/new_group'>Start a new group</Link> |</span>
                <span><Link to="/login">Log in</Link></span>
                <span><Link to="/signup">Sign up</Link></span>
            </div>
        </div>
    )
}

export default Navbar;