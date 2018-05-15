import React from 'react';

import L from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import 'leaflet.gridlayer.googlemutant/Leaflet.GoogleMutant.js';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import JobsMarker from './JobsMarker';

class JobsMap extends React.Component {
    constructor(props) {
        super(props);

        this.layer = L.markerClusterGroup();
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
            this.map.fitBounds(this.layer.getBounds(), {
                padding: [25, 25]
            });
        }
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.searching && !this.props.searching) {
            this.centerMap();
        }

        if (this.props.jobs.length === 0) {
            this.layer.clearLayers();
        }

        this.map.invalidateSize();
    }
    
    componentDidMount() {
        let SearchControl;
            
        this.map = L.map('map', {
            center: [0, 0],
            zoom: 2
        });
        
        SearchControl = L.Control.extend({
            onAdd: () => this.searchControl.current
        });

        this.map.addControl(new SearchControl());

        L.gridLayer.googleMutant({
			styles: [
				{elementType: 'labels', stylers: [{visibility: 'off'}]},
				{featureType: 'water', stylers: [{color: '#444444'}]},
				{featureType: 'landscape', stylers: [{color: '#eeeeee'}]},
				{featureType: 'road', stylers: [{visibility: 'off'}]},
				{featureType: 'poi', stylers: [{visibility: 'off'}]},
				{featureType: 'transit', stylers: [{visibility: 'off'}]},
				{featureType: 'administrative', stylers: [{visibility: 'off'}]},
				{featureType: 'administrative.locality', stylers: [{visibility: 'off'}]}
			],
			maxZoom: 24,
			type: 'roadmap'
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
                    <i className="fa fa-search fa-2x"></i>
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
