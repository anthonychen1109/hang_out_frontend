import React from 'react';

const Footer = () => {
    return (
        <div className="footer">
            <div className="overlay">
                <div className="social-media">
                    <a href="https://www.linkedin.com/in/anthony-chen-1109" target="_blank"><i className="fab fa-linkedin fa-3x"></i></a>
                    <a href="https://www.github.com/anthonychen1109" target="_blank"><i className="fab fa-github fa-3x"></i></a>
                    <a href="mailto:chen.anthony.1109@gmail.com"><i className="fas fa-envelope fa-3x"></i></a>
                </div>
                <div className="copyright">
                    <p className="signature">&copy; Anthony Chen</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;