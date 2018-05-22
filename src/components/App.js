import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom'

import 'font-awesome/css/font-awesome.min.css';
import '../styles/App.css';

import Home from './Home';
import About from './About';
import JobsMap from './JobsMap';
import JobDetail from './JobDetail';

class App extends Component {
    constructor(props) {
        super(props);
    
        this.state = { 
            jobs: [], 
            searching: true, 
            formSearch: '', 
            error: null 
        };
    }
    
    componentDidMount() {
        this.onSearch();
    }

    onSearch = (e, searchVal) => {
        searchVal = searchVal ? searchVal : '';
        if (e) e.preventDefault();

        this.setState({
            searching: true,
            formSearch: searchVal,
            jobs: [],
            error: null
        });

        this.loopSearch(searchVal, 0);
    }

    loopSearch(searchVal, page) {
        let promises = [],
            i;
        
        for (i = page; i < page+6; i++) {
            promises.push(this.search(searchVal, i));
        }

        Promise.all(promises).then((jobs) => {
            // Any array was an empty result; we are done
            if (jobs.find((j) => j.length === 0)) {
                this.setState({ formSearch: '', searching: false, error: null });
            } else {
                this.loopSearch(searchVal, i);
            }
        });
    }

    search(searchVal, page) {
        let url = `http://localhost/api/jobs?search=${searchVal}&page=${page}`;

        return fetch(url)
            .then(r => r.json())
            .then((jobs) => {
                if (jobs.error) {
                    throw new Error(jobs.message);
                }

                this.setState(prevState => ({
                    jobs: prevState.jobs.concat(jobs)
                }));

                return jobs;
            })
            .catch((e) => {
                this.setState({ 
                    formSearch: '', 
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

                    <Route path="/about" render={() =>
                        this.state.formSearch ? <Redirect push to="/jobs" /> : <About onSearch={this.onSearch} />
                    }/>

                    <Route path="/job/:jobId" render={({match}) => 
                        this.state.formSearch ? <Redirect push to="/jobs" /> :
                            <JobDetail searching={this.state.searching} 
                                    job={this.state.jobs.find((j) => j.id === match.params.jobId)}
                                    onSearch={this.onSearch} />
                    }/>

                    <Route path="/jobs" render={() => 
                        <JobsMap searching={this.state.searching} 
                            formSearch={this.state.formSearch}
                            jobs={this.state.jobs} 
                            onSearch={this.onSearch}
                            error={this.state.error} />
                    }/>

                </React.Fragment>
            </Router>
        );
    }
}

export default App;
