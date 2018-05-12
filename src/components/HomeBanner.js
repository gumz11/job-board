import React from 'react';

const HomeBanner = (props) => {
    return (
        <section className="jb-banner jb-center">
            {props.children}
        </section>
    );
}

export default HomeBanner;