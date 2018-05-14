import React from 'react';

const HomeBanner = (props) => {
    return (
        <section className="jb-banner">
            <div className="jb-content jb-center jb-row">
                {props.children}
            </div>
        </section>
    );
}

export default HomeBanner;