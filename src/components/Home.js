import React from 'react';
import HomeBanner from './HomeBanner';
import HomeFill from './HomeFill';
import Footer from './Footer';

import screen2 from '../images/screen2.jpg';
import screen3 from '../images/screen3.jpg';
import screen4 from '../images/screen4.jpg';

class Home extends React.Component {
    componentDidMount = () => {
        let fillScreens = document.querySelectorAll('.jb-background');
        fillScreens.forEach(s => s.style.height = window.innerHeight+'px');
    }

    render() {
        return (
            <React.Fragment>
                <main>
                    <HomeFill screen={screen4} />
                    <HomeBanner>
                        This is the best site! And this is why.
                    </HomeBanner>
                    <HomeFill screen={screen2} />
                    <HomeBanner>
                        Here are some cool icons to tell you more.
                        {/* <HomeIcon />
                        <HomeIcon />
                        <HomeIcon /> */}
                    </HomeBanner>
                    <HomeFill screen={screen3} />
                </main>
                <Footer />
            </React.Fragment>
        );
    }
}

export default Home;