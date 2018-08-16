import React from 'react';

const Control = (props) => (
    <div className="jb-control jb-btn" onClick={props.control}>
        <i className={`fa fa-${props.icon}`}></i>
    </div>
);

export default Control;