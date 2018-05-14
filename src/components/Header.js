import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.nav = React.createRef();
    }
    handleClick = () => {
        this.nav.current.classList.toggle('jb-nav-visible');
    }
    render() {
        return (
            <header className={`jb-${this.props.type}`}>
                <div className="jb-logo jb-row">
                    <i className="fas fa-laptop fa-5x"></i>        
                    <h1 className="jb-title">Job Board</h1>
                    <form onSubmit={this.props.onSearch}>
                        <input className="jb-search" type="search" placeholder="Search jobs" />
                    </form>
                    <button onClick={this.handleClick} className="jb-btn"><i className="fas fa-bars fa-2x"></i></button>
                </div>
                <nav ref={this.nav} className="jb-nav jb-row">
                    <ul>
                        <li className="jb-btn"><Link to="/">Home</Link></li>
                        <li className="jb-btn"><Link to="/jobs">Jobs</Link></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;