import React from 'react';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import JobsMarker from './JobsMarker';

class JobsMap extends React.Component {
    constructor(props) {
        super(props);

        this.layer = L.featureGroup();
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

    centerMap() {
        if (this.layer.getLayers().length) {
            this.map.fitBounds(this.layer.getBounds());
        }
    }
    
    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (prevProps.jobs !== this.props.jobs) {
            return true;
        } 
        return null;
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot) {
            this.centerMap();
        }
    }
    
    componentDidMount() {
        let SearchControl;
            
        this.map = L.map('map', {
            center: [0, 0],
            zoom: 1
        });
        
        SearchControl = L.Control.extend({
            onAdd: () => this.searchControl.current
        });

        this.map.addControl(new SearchControl());

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        this.layer.addTo(this.map);

        if (this.props.jobs.length) {
            this.centerMap();
        }
    }
    
    render() {
        return (
            <div className="jb-fill" id="map">
                {/* Controls */}
                <div ref={this.searchControl} className="jb-control jb-btn" onClick={this.props.controlHeader}>
                    <i className="fas fa-search fa-2x"></i>
                </div>
                {/* Markers */}
                {this.props.jobs.map((m) => 
                    <JobsMarker {...m} markerIcon={this.markerIcon} layer={this.layer} key={m.id} /> 
                )}
            </div>
        );
    }
} 

export default JobsMap;
