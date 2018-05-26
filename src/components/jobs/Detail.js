import React from 'react';

import Message from './Message';

const JobsDetail = (props) => (
    <main className="jb-fill jb-row">
        {props.job ? 
            <section className="jb-main jb-content">
                <h1><a href={props.job.url}>{props.job.title}</a></h1>
                <h4>{props.job.company} - {props.job.location} </h4>
                <br/>
                <h5> Posted: {props.job.created_at} - {props.job.type} </h5>
                <br/>
                <div className="jb-html" dangerouslySetInnerHTML={{__html: props.job.description}} />
            </section>
        : <Message searching={props.searching} error={'Job not found.'} />}
    </main>
);

export default JobsDetail;