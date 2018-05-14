import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom'

import '../lib/fontawesome/css/fontawesome-all.min.css';
import '../styles/App.css';

import Home from './Home';
import Jobs from './Jobs';
import JobDetail from './JobDetail';

class App extends Component {
    constructor(props) {
        super(props);
    
        this.state = { jobs: [], searching: true, formSearch: false };
    }
    componentDidMount() {
        this.onSearch();
    }
    onSearch = (e) => {
        if (e) {
            e.preventDefault();

            this.setState({
                searching: true,
                formSearch: true
            });
        }
        
        setTimeout(() => {
            console.log('Getting temp data...');
            let jobs = [{ 
                id: '6a5dceaa-26e0-11e8-9666-71a04d9ea2de',
                created_at: 'Sun May 13 17:13:09 UTC 2018',
                title: 'C++ Game Developer',
                location: 'Barcelona',
                type: 'Full Time',
                description: '<p>Phoenix Studio in Barcelona is looking for a passionate developer to take the meta-game of our titles to unexplored worlds. As a developer, you help games to change features on the level of difficulty, competition and cooperation. You can participate with new ideas to our life system and the way we interact with each other. This is a great opportunity to work in a studio that celebrates failures as much as successes!</p>\n\n<p>As developer, you will work inside the game teams (game developers, backend developers, artists, designers and producers) to deliver a great player experience ensuring the client architecture is of high quality and the game play is polished, enterprising and above all fun. You will participate of and improve our best practices</p>\n\n<p>YOUR ROLE</p>\n\n<p>If you want to create amazing user experiences and entertainment for millions of players to enjoy on the go then this is the right job for you. Together with your teammates you will take a lead on creating and maintaining our mobile games. You will specify, design, build and implement existing and new game features. As part of the development team you will enjoy a creative, challenging and collaborative environment where your ideas will be every bit as valued as your programming expertise. Some bite sized bullet points of the job description are:</p>\n\n<ul>\n<li>Design, architect, test and implement game features</li>\n<li>Take an active part in game creation</li>\n<li>Maintain and optimize new and existing game features</li>\n<li>Deliver high quality and well-structured code</li>\n<li>Share knowledge and help colleagues</li>\n</ul><p>SKILLS TO CREATE THRILLS</p>\n\n<p>In our opinion, programming experience and dedication for gaming as well as the willingness to share great ideas are equally valued. Are you passionate? Are you a creative team player?</p>\n\n<ul>\n<li>Excellent C++ knowledge</li>\n<li>Game development experience</li>\n<li>Experience with Android or iOS development</li>\n<li>Experience with real time rendering (OpenGL preferred)</li>\n<li>Passion for game Development</li>\n<li>High sense of quality and polish</li>\n<li>Capable of taking a technical responsibility for a product or project</li>\n</ul><p>BONUS SKILLS</p>\n\n<ul>\n<li>Working with content pipelines</li>\n<li>Strong 3D math skills</li>\n<li>AAA or PC titles experience</li>\n<li>Experience in working with memory / performance critical applications</li>\n</ul><p>A GREAT SAGA NEEDS ALL SORT OF HEROES</p>\n\n<p>Making games is fun. Especially when you do it with people who share the same idea of what makes a good workplace, great. We design games for everyone, no matter where they are or who they are, and we employ all sorts of people from all kinds of backgrounds to bring them to life. Truth is, we simply can’t expect diversity in our players and originality in our games without first nurturing it in our people. A great saga needs all sorts of heroes. And that’s it.</p>\n\n<p>WE’RE SERIOUSLY PLAYFUL</p>\n\n<p>Officially, we’re a leading interactive entertainment company for the mobile world. Unofficially, we’re a serious business that’s not afraid to have fun. Every day at King, we mix intuition with logic, art with science and magic with mathematics to create the games the world loves to play. Together with our parent company Activision Blizzard, our mission is to bring moments of magic to everyday life. If you think this is something you can help us achieve, let’s talk.</p>',
                how_to_apply: '<p><a href="https://king.com/es/jobs/c-game-developer-775?breadcrumbs=/es/jobs&amp;location=barcelona">Apply Here</a></p>',
                company: 'King',
                company_url: 'http://www.king.com',
                company_logo: 'http://github-jobs.s3.amazonaws.com/65d69916-26e0-11e8-969c-ee1d984969cc.png',
                url: 'http://jobs.github.com/positions/6a5dceaa-26e0-11e8-9666-71a04d9ea2de',
                lat: 37.7749,
                lng: -122.4194
            }, {
                id: '1',
                title: '123',
                lat: 0,
                lng: 0
            }];
            this.setState({
                formSearch: false,
                searching: false,
                jobs: jobs
            });
        }, 1000);
    }
    render() {
        return (
            <Router>
                <React.Fragment>
                    
                    <Route exact path="/" render={() =>
                        this.state.formSearch ? <Redirect push to="/jobs" /> : <Home onSearch={this.onSearch} />
                    }/>

                    <Route path="/jobs" render={() => <Jobs jobs={this.state.jobs} onSearch={this.onSearch} />}/>
                    
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
