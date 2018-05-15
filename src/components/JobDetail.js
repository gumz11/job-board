import React from 'react';

import Header from "./Header";

class JobsDetail extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header onSearch={this.props.onSearch} />
                <main className="jb-fill jb-row">
                    <section className="jb-main jb-content">
                        {this.props.searching ? 'SEARCHING...' : this.props.job ? 
                            <React.Fragment>
                                <h1>{this.props.job.title}</h1>
                                <h4>{this.props.job.company} - {this.props.job.location} </h4>
                                <br/>
                                <h5> Posted: {this.props.job.created_at} - {this.props.job.type} </h5>
                                <br/>
                                <p dangerouslySetInnerHTML={{__html: this.props.job.description}} />
                            </React.Fragment>
                        : 'JOB NOT FOUND'}
                    </section>
                </main>
            </React.Fragment>
        );
    }
}

export default JobsDetail;