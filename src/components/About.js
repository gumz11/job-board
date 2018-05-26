import React from 'react';

const About = (props) => (
    <React.Fragment>
        <main className="jb-fill jb-row">
            <section className="jb-main jb-content">
                <div className="jb-about">
                    <p> 
                        Job Board is not a real company. 
                    </p>
                    <p>
                        Obviously, once you look around you'll notice there isn't much you can do with this site, other than view jobs on a map. It would be cool to expand this project with other Job APIs to see more on the map. There is no user functionality currently or much of any data persistance (aside from temporary geolocation storage on the backend). It would be cool to see users save searches and favorite jobs. There are lots of ways this site could be enhanced. This wasn't a project to build a fully functional site though.
                    </p>
                    <p>
                        This is my first time using React and the main purpose of this project was to try it out. It was a very enjoyable experience and I think I will be using React going forward for new UI projects.
                    </p>
                    <p>
                        Most of the concepts are familiar to me. I have been using HTML5 Web Components technology for awhile now in my day job. A component based architecture and encapsulated styling are well known topics to me. Conceptually, a React component and a HTML5 Web Component are similar and so their architecture can be similar as well. HTML5 Web Components uses the shadow DOM, while we can use ES6 module imports in React to guarantee encapsulated styling.
                    </p>
                    <p>
                        Newer concepts for me are state management and how React components react to changes in state/prop values. I understand why it’s named as it is now! I was constantly tempted to add event listeners throughout development, but with the lifecycle method componentDidUpdate and conditional rendering based on props/state inside the render() function it really isn’t necessary. There were a couple places where I had to add listeners when working with Leaflet because it is not a library written declaratively, though I feel like with more time I might be able to adapt it to React’s style. Or there is probably a plugin or two out there already.
                    </p>
                    <p>
                        Either way, this was a great project and I look forward to using React in the future. I decided not to include a state management package like Redux or Flux because I just wanted to focus on React and what it offers. I will look at these and other supporting tech in the future.
                    </p>
                </div>
            </section>
        </main>
    </React.Fragment>
);

export default About;