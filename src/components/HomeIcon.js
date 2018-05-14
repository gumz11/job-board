import React from 'react';

const HomeIcon = (props) => {
    return (
        <div className="jb-icon jb-center">
            <i className={`fas fa-${props.type} fa-5x`}></i>        
            <h4> {props.children} </h4>
        </div> 
    );
}

export default HomeIcon;