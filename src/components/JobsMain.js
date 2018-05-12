import React from 'react';
import JobsForm from './JobsForm';
import JobsMap from './JobsMap';

class JobsMain extends React.Component {
    render() {
        return (
            <section className="jb-fill jb-column">
                <JobsForm />
                <JobsMap />
            </section>
        );
    }
} 

export default JobsMain;
