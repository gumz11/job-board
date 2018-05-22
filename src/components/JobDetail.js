import React from 'react';

import Header from "./Header";
import JobsMessage from './JobsMessage';

const JobsDetail = (props) => (
    <React.Fragment>
        <Header onSearch={props.onSearch} />
        <main className="jb-fill jb-row">
            {props.searching ? <JobsMessage /> : !props.job  && <JobsMessage error="Job not found." /> }
            <section className="jb-main jb-content">
                {props.job && 
                    <React.Fragment>
                        <h1><a href={props.job.url}>{props.job.title}</a></h1>
                        <h4>{props.job.company} - {props.job.location} </h4>
                        <br/>
                        <h5> Posted: {props.job.created_at} - {props.job.type} </h5>
                        <br/>
                        <div className="jb-html" dangerouslySetInnerHTML={{__html: props.job.description}} />
                    </React.Fragment>
                }
            </section>
        </main>
    </React.Fragment>
);

export default JobsDetail;