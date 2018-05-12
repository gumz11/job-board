import React from 'react';

import JobsMain from './JobsMain';
import JobsSidebar from './JobsSidebar';

const Jobs = () => {
    return (
        <main className="jb-fill jb-row">
            <JobsMain />
            <JobsSidebar />
        </main>
    );
}

export default Jobs;