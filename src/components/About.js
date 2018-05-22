import React from 'react';

import Header from "./Header";

const About = (props) => (
    <React.Fragment>
        <Header onSearch={props.onSearch} />
        <main className="jb-fill jb-row">
            <section className="jb-main jb-content">
                <div className="jb-html">
                    <p> The about page! </p>
                </div>
            </section>
        </main>
    </React.Fragment>
);

export default About;