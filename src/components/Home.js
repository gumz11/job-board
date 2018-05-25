import React from 'react';

import HomeBanner from './HomeBanner';
import HomeIcon from './HomeIcon';
import HomeFill from './HomeFill';
import Footer from './Footer';

import screen2 from '../images/screen2.jpg';
import screen3 from '../images/screen3.jpg';

const Home = () => (
    <React.Fragment>
        <main>
            <HomeBanner>
                <div className="jb-row jb-top">
                    <div className="jb-left">
                        <h1>Job viewing</h1>
                        <h2>on a map.</h2>
                        <br />
                        <h5>It's pretty cool</h5>
                    </div>
                    <div className="jb-right">
                        <i className="fa fa-map-o fa-5x"></i>
                    </div>
                </div>
                <div className="jb-row jb-top jb-next">
                    <p> View jobs on a map in <a> any </a> modern browser. Oh yea. </p>
                </div>
                <HomeIcon type="google">
                    Map layer and Geocoding provided by Google Maps
                    <a href="https://cloud.google.com/maps-platform/"> Platform</a>.
                </HomeIcon>
                <HomeIcon type="leaf">
                    Mobile-friendly interactive Maps library provided 
                    by <a href="https://leafletjs.com/"> Leaflet</a>.
                </HomeIcon>
                <HomeIcon type="github">
                    The best jobs provided by GitHub 
                    <a href="https://jobs.github.com/"> Jobs</a>.
                </HomeIcon>
            </HomeBanner>
            <HomeFill screen={screen2} />
            <HomeBanner>
                <div className="jb-center jb-quote">
                    <p>
                        "If you aren't already excited to search, enjoy these background images.
                        I hope they will get you into job searching mode."
                    </p>
                    <p> - Andrew </p>
                </div>
            </HomeBanner>
            <HomeFill screen={screen3} />
        </main>
        <Footer />
    </React.Fragment>
);

export default Home;