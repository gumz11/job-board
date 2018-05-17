import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (props) => {
    return (
        <footer className="jb-content jb-center jb-row">
            <div>
                <Link to="/about"> About </Link> 
            </div>
            <div>
                <a><i className="fa fa-copyright"></i> Job Board Inc. </a>
            </div>
        </footer>
    );
}

export default Footer;