import React from 'react';

const Message = (props) => (
    <div>
        {props.searching ? 
            <div className="jb-message">
                <i className="fa fa-spinner fa-5x"></i>
            </div>
        : props.error && 
            <div className="jb-message">
                <h2> <i className="fa fa-exclamation-triangle"></i> {props.error} </h2>
            </div>
        }
    </div>
);

export default Message;