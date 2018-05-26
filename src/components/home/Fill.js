import React from 'react';

const Fill = (props) => (
    <div className="jb-background" style={{
        height: window.innerHeight+'px', 
        backgroundImage:`url("${props.screen}")`
    }}></div>
);

export default Fill;