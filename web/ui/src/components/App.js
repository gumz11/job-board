import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import 'font-awesome/css/font-awesome.min.css';
import '../styles/App.css';

import Header from './Header';
import Home from './home/Home';
import About from './About';
import Map from './jobs/Map';
import Detail from './jobs/Detail';

class App extends Component {
    constructor(props) {
        super(props);
    
        this.state = { 
            jobs: [], 
            bounds: null,
            searching: true, 
            error: null 
        };

        this.jobs = [];
    }
    
    componentDidMount() {
        this.loopSearch('', 1);
    }

    onSearch = (e, searchVal, history) => {
        searchVal = searchVal ? searchVal : '';
        if (e) e.preventDefault();

        this.setState({
            searching: true,
            jobs: [],
            error: null
        });

        if (history.location.pathname !== '/jobs') {
            history.push('/jobs');
        }
        this.jobs = [];
        this.loopSearch(searchVal, 1);
    }

    // GitHub Job API is designed to be paged. We just want all results, 
    // so let's fetch 6 at a time and keep going until we get empty
    // results.
    loopSearch(searchVal, page) {
        let promises = [],
            i;
        
        for (i = page; i < page+6; i++) {
            promises.push(this.search(searchVal, i));
        }

        Promise.all(promises).then((jobs) => {
            // Any array was an empty result; we are done
            if (jobs.find((j) => j && j.length === 0)) {
                this.setState({ 
                    searching: false, 
                    error: null,
                    jobs: this.jobs
                });
            } else {
                this.loopSearch(searchVal, i);
            }
        }).catch((e) => {
            this.setState({ 
                searching: false, 
                error: 'An error occured. Please search again or refresh your browser.' 
            });
        });;
    }

    search(searchVal, page) {
        let url = `/api/jobs?search=${searchVal}&page=${page}`;

        return fetch(url)
            .then(r => r.json())
            .then((jobs) => {
                if (jobs.error) {
                    throw new Error(jobs.message);
                }

                this.jobs = this.jobs.concat(jobs);
                return jobs;
            });
    }

    setBounds = (bounds) => {
        this.setState({
            bounds: bounds
        });
    }

    render() {
        return (
            <Router>
                <React.Fragment>
                    <Header onSearch={this.onSearch} searching={this.state.searching} />
                        
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />

                    <Route path="/job/:jobId" render={({match}) => 
                        <Detail searching={this.state.searching} 
                                job={this.state.jobs.find((j) => j.id === match.params.jobId)} />
                    }/>

                    <Route path="/jobs" render={() => 
                        <Map searching={this.state.searching}
                            setStateBounds={this.setBounds} 
                            bounds={this.state.bounds}
                            jobs={this.state.jobs} 
                            error={this.state.error} />
                    }/>

                </React.Fragment>
            </Router>
        );
    }
}

export default App;
