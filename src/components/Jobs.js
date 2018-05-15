import React from 'react';

import Header from './Header';
import JobsForm from './JobsForm';
import JobsMap from './JobsMap';
import JobsSidebar from './JobsSidebar';

class Jobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = { header: 'hidden' };
    }
    controlHeader = () => {
        this.setState(prevState => ({
            header: prevState.header ? '' : 'hidden'
        }));
    }
    render() {
        return (
            <React.Fragment>
                <Header className="jb-job-header" nav="hidden" display={this.state.header} onSearch={this.props.onSearch} />
                <main className="jb-fill jb-row">
                    <section className="jb-fill jb-column">
                        <JobsForm />
                        <JobsMap searching={this.props.searching} jobs={this.props.jobs} controlHeader={this.controlHeader}/>
                    </section>
                    <JobsSidebar />
                </main>
            </React.Fragment>
        );
    }
}

export default Jobs;