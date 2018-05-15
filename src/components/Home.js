import React from 'react';

import Header from './Header';
import HomeBanner from './HomeBanner';
import HomeIcon from './HomeIcon';
import HomeFill from './HomeFill';
import Footer from './Footer';

import screen2 from '../images/screen2.jpg';
import screen3 from '../images/screen3.jpg';
import screen4 from '../images/screen4.jpg';

class Home extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Header display='fixed' onSearch={this.props.onSearch} />
                <main>
                    <HomeFill screen={screen4} />
                    <HomeBanner>
                        <div style={{padding: '25px'}}>
                            <h3>
                                This is the best site! And this is why.This is the best site! And this is why.This is the best site! And this is why.This is the best site! And this is why.This is the best site! And this is why.This is the best site! And this is why.
                            </h3>
                        </div>
                    </HomeBanner>
                    <HomeFill screen={screen2} />
                    <HomeBanner>
                        <HomeIcon type="briefcase"> Here are some cool icons to tell you more. </HomeIcon>
                        <HomeIcon type="address-card"> Here are some cool icons to tell you more. </HomeIcon>
                        <HomeIcon type="clock-o"> Here are some cool icons to tell you more. </HomeIcon>
                    </HomeBanner>
                    <HomeFill screen={screen3} />
                </main>
                <Footer />
            </React.Fragment>
        );
    }
}

export default Home;