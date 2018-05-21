import React from 'react';

const JobsMessage = (props) => (
    <div className="jb-message">
        {props.error ? 
            <h2> <i className="fa fa-exclamation-triangle"></i> {props.error} </h2> :
            <i className="fa fa-spinner fa-5x"></i>
        }
    </div>
);

export default JobsMessage;