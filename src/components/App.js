import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom'

import 'font-awesome/css/font-awesome.min.css';
import '../styles/App.css';

import Home from './Home';
import JobsMap from './JobsMap';
import JobDetail from './JobDetail';

class App extends Component {
    constructor(props) {
        super(props);
    
        this.state = { 
            jobs: [], 
            searching: true, 
            formSearch: false, 
            error: null 
        };
    }
    
    componentDidMount() {
        this.search('', 0);
    }

    onSearch = (e, searchVal) => {
        searchVal = searchVal ? searchVal : '';
        
        e.preventDefault();
        this.setState({
            searching: true,
            formSearch: true,
            jobs: [],
            error: null
        });

        this.search(searchVal, 0);
    }

    search(searchVal, page) {
        let url = `http://localhost/api/jobs?search=${searchVal}&page=${page}`;

        fetch(url)
            .then(r => r.json())
            .then((jobs) => {

                if (jobs.error) {
                    throw new Error(jobs.message);
                }

                this.setState(prevState => ({
                    jobs: prevState.jobs.concat(jobs)
                }));

                if (jobs.length) {
                    this.search(searchVal, ++page);
                } else {
                    this.setState({ formSearch: false, searching: false, error: null });
                }
            })
            .catch((e) => {
                this.setState({ 
                    formSearch: false, 
                    searching: false, 
                    error: 'An error occured. Please search again or refresh your browser.' 
                });
            });
    }

    render() {
        return (
            <Router>
                <React.Fragment>
                    
                    <Route exact path="/" render={() =>
                        this.state.formSearch ? <Redirect push to="/jobs" /> : <Home onSearch={this.onSearch} />
                    }/>

                    <Route path="/jobs" render={() => 
                        <JobsMap searching={this.state.searching} 
                            jobs={this.state.jobs} 
                            onSearch={this.onSearch}
                            error={this.state.error} />
                    }/>
                    
                    <Route path="/job/:jobId" render={({match}) => 
                        this.state.formSearch ? <Redirect push to="/jobs" /> :
                            <JobDetail searching={this.state.searching} 
                                    job={this.state.jobs.find((j) => j.id === match.params.jobId)}
                                    onSearch={this.onSearch} />
                    }/>

                </React.Fragment>
            </Router>
        );
    }
}

export default App;
