import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import '../lib/fontawesome/css/fontawesome-all.min.css';
import '../styles/App.css';

import Header from './Header';
import Home from './Home';
import Jobs from './Jobs';

class App extends Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Header />
                    <Route exact path="/" component={Home}/>
                    <Route path="/jobs" component={Jobs}/>
                </React.Fragment>
            </Router>
        );
    }
}

export default App;
