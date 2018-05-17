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
        this.searchControl = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.map !== this.props.map) {
            let SearchControl = L.Control.extend({
                onAdd: () => this.searchControl.current
            });

            this.props.map.addControl(new SearchControl());

            L.gridLayer.googleMutant({
                styles: [
                    {elementType: 'labels.text.stroke', stylers: [{visibility: 'off'}]},
                    {featureType: 'water', stylers: [{color: '#444444'}]},
                    {featureType: 'landscape', stylers: [{color: '#eeeeee'}]},
                    {featureType: 'road', stylers: [{visibility: 'off'}]},
                    {featureType: 'poi', stylers: [{visibility: 'off'}]},
                    {featureType: 'transit', stylers: [{visibility: 'off'}]},
                    // {featureType: 'administrative', stylers: [{visibility: 'off'}]},
                    {featureType: 'administrative.locality', stylers: [{visibility: 'off'}]}
                ],
                type: 'roadmap'
            }).addTo(this.props.map);
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.map ?
                    <div ref={this.searchControl} className="jb-control jb-btn" onClick={this.props.headerControl}>
                        <i className="fa fa-search fa-2x"></i>
                    </div>
                : ''}
                {this.props.jobs.map((m) => 
                    <JobsMarker {...m} markerIcon={this.markerIcon} layer={this.props.layer} key={m.id} /> 
                )}
            </React.Fragment>
        );
    }
}

export default JobsMap;