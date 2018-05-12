import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => {
    function handleClick() {
        var nav = document.querySelector('.jb-nav');
        nav.classList.toggle('jb-nav-visible');
    }
    return (
        <header>
            <div className="jb-logo jb-row">
                <i className="fas fa-laptop fa-5x"></i>        
                <h1 className="jb-title">Job Board</h1>
                <input className="jb-search" type="search" placeholder="Search jobs" />
                <button onClick={handleClick} className="jb-btn"><i className="fas fa-bars fa-2x"></i></button>
            </div>
            <nav className="jb-nav jb-row">
                <ul>
                    <li className="jb-btn"><Link to="/">Home</Link></li>
                    <li className="jb-btn"><Link to="/jobs">Jobs</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;