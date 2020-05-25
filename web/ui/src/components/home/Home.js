import React from 'react';

import Banner from './Banner';
import Icon from './Icon';
import Fill from './Fill';
import Footer from '../Footer';

import jpg1 from '../../images/nathan-dumlao-609929-unsplash.jpg';
import jpg2 from '../../images/rawpixel-679092-unsplash.jpg';

const Home = () => (
    <React.Fragment>
        <main>
            <Banner>
                <div className="jb-row jb-top">
                    <div className="jb-left">
                        <h1>Job viewing</h1>
                        <h2>on a map.</h2>
                        <br />
                    </div>
                    <div className="jb-right">
                        <i className="fa fa-map-o fa-5x"></i>
                    </div>
                </div>
                <div className="jb-row jb-top jb-next">
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
            <Fill screen={jpg1} photographer="nate_dumlao" />
            <Banner>
                <div className="jb-center jb-quote">
                    <p>
                        "Enjoy these background images."
                    </p>
                    <p> - Andrew </p>
                </div>
            </Banner>
            <Fill screen={jpg2} photographer="rawpixel" />
            <Footer />
        </main>
        
    </React.Fragment>
);

export default Home;