import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (props) => {
    return (
        <footer>
            <div className="jb-content jb-center jb-row">
                <div>
                    <Link to="/about"> About </Link> 
                </div>
                <div>
                    <i className="fa fa-copyright"></i> Job Board
                </div>
            </div>
        </footer>
    );
}

export default Footer;