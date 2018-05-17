import React from 'react';

import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import JobsMarker from './JobsMarker';

class JobsMap extends React.Component {
    constructor(props) {
        super(props);

        this.markerIcon = L.icon({ 
            iconUrl: markerIcon, 
            iconSize: [25, 41],
            iconAnchor: [13.5, 40],
            popupAnchor: [0, -25],
            shadowUrl: markerShadow,
            shadowSize: [41, 41]
        });
    }

    render() {
        return (
            <React.Fragment>
                {this.props.jobs.map((m) => 
                    <JobsMarker {...m} markerIcon={this.markerIcon} layer={this.props.layer} key={m.id} /> 
                )}
            </React.Fragment>
        );
    }
}

export default JobsMap;