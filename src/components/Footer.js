import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (props) => {
    return (
        <footer className="jb-content jb-center jb-row">
            <div>
                <Link to="/about"> About </Link> 
                <Link to="/contact"> Contact Us </Link>
            </div>
            <div>
                <a><i className="fa fa-copyright"></i> Job Board Inc. (jk)</a>
            </div>
        </footer>
    );
}

export default Footer;