import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { navVisible: '' };
    }
    handleClick = () => {
        this.setState((prevState) => ({
            navVisible: prevState.navVisible ? '' : 'jb-nav-visible'
        }));
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
                <nav className={`jb-nav jb-row ${this.state.navVisible}`}>
                    <Link to="/" className="jb-btn">Home</Link>
                    <Link to="/jobs" className="jb-btn">Jobs</Link>
                </nav>
            </header>
        );
    }
}

export default Header;