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
                        Obviously, once you look around you'll notice there isn't much you can do with this site, other than view jobs on a map. It would be cool to expand this project with other Job APIs to see more on the map. There is no user functionality currently or much of any data persistance (aside from temporary geolocation storage on the backend). It would be cool to see users save searches and favorite jobs or maybe other things! There are lots of ways this site could be enhanced. This wasn't a project to build a fully functional site though.
                    </p>
                    <p>
                        I thought it would be cool to put GitHub Jobs on a map. I also wanted to try out React and put the project on open source. I don’t have a lot of projects on my GitHub account, so this is a good way to show some of my skills. I’d like to contribute more to open source, if possible. I really like the React framework and the docs were super helpful with getting started. I will definitely try to use React more on future projects/contributions.
                    </p>
                    <p>
                        I hope you enjoy the site. I enjoyed putting it together! Thanks 🙂 
                    </p>
                </div>
            </section>
        </main>
    </React.Fragment>
);

export default About;