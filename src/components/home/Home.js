import React from 'react';

import Banner from './Banner';
import Icon from './Icon';
import Fill from './Fill';
import Footer from '../Footer';

import screen2 from '../../images/screen2.jpg';
import screen3 from '../../images/screen3.jpg';

const Home = () => (
    <React.Fragment>
        <main>
            <Banner>
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
                <Icon type="google">
                    The map tile layer and Geocoding from the Google Maps
                    <a href="https://cloud.google.com/maps-platform/"> Platform</a>.
                </Icon>
                <Icon type="leaf">
                    Using the mobile-friendly interactive Maps library, 
                     <a href="https://leafletjs.com/"> Leaflet</a>.
                </Icon>
                <Icon type="github">
                    Showing the best jobs in tech found at GitHub 
                    <a href="https://jobs.github.com/"> Jobs</a>.
                </Icon>
            </Banner>
            <Fill screen={screen2} />
            <Banner>
                <div className="jb-center jb-quote">
                    <p>
                        "If you aren't already excited to search, enjoy these background images.
                        I hope they will get you into job searching mode."
                    </p>
                    <p> - Andrew </p>
                </div>
            </Banner>
            <Fill screen={screen3} />
        </main>
        <Footer />
    </React.Fragment>
);

export default Home;