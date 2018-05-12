import React from 'react';

import JobsMap from './JobsMap';
import JobsSidebar from './JobsSidebar';

const Jobs = () => {
    return (
        <main className="jb-fill jb-row">
            <JobsMap />
            <JobsSidebar />
        </main>
    );
}

export default Jobs;