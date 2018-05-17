import React from 'react';

import L from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import 'leaflet.gridlayer.googlemutant/Leaflet.GoogleMutant.js';
import 'leaflet/dist/leaflet.css';

import Header from './Header';
import JobsMap from './JobsMap';
import JobsSidebar from './JobsSidebar';

class Jobs extends React.Component {
    constructor(props) {
        super(props);

        this.state = { header: 'hidden' };

        this.map = null;
        this.layer = L.markerClusterGroup();
        this.searchControl = React.createRef();
    }

    headerControl = () => {
        this.setState(prevState => ({
            header: prevState.header ? '' : 'hidden'
        }));
    }

    onSidebarClick = (markerData) => {
        let markers = this.layer.getLayers(),
            marker = markers.find((m) => m.options.id === markerData.id);

        if (marker) {
            this.centerMap(marker.__parent.getBounds(), () => {
                this.recursiveZoomOrSpiderfy(marker);
            });
        }
    }

    recursiveZoomOrSpiderfy(marker) {
        let parent = marker.__parent,
            group = parent._group;

        if (marker.getElement()) {
            marker.openPopup();
        } else {
            group.once('animationend', () => {
                this.recursiveZoomOrSpiderfy(marker);
            });
            group._zoomOrSpiderfy({layer: parent});
        }
    }

    centerMap(bounds, cb) {
        if (bounds.isValid()) {
            if (cb) this.map.once('moveend', cb);
            this.map.fitBounds(bounds, {
                maxZoom: 15
            });
        }
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.searching && !this.props.searching) {
            this.centerMap(this.layer.getBounds());
        }

        if (this.props.jobs.length === 0) {
            this.layer.clearLayers();
        }

        this.map.invalidateSize();
    }
    
    componentDidMount() {          
        this.map = L.map('map', {
            center: [0, 0],
            zoom: 2,
            maxZoom: 24
        });

        let SearchControl = L.Control.extend({
            onAdd: () => this.searchControl.current
        });

        this.map.addControl(new SearchControl());

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
        }).addTo(this.map);

        this.layer.addTo(this.map);

        if (this.props.jobs.length) {
            this.centerMap(this.layer.getBounds());
        }
    }
    
    render() {
        return (
            <React.Fragment>
                <Header className="jb-job-header" nav="hidden" display={this.state.header} onSearch={this.props.onSearch} />
                <main className="jb-main jb-fill jb-row">
                    <section className="jb-fill jb-column">
                        <div className="jb-fill" id="map">
                            <div ref={this.searchControl} className="jb-control jb-btn" onClick={this.headerControl}>
                                <i className="fa fa-search fa-2x"></i>
                            </div>
                            <JobsMap jobs={this.props.jobs}  
                                layer={this.layer}
                                map={this.map} />
                        </div>
                    </section>
                    <JobsSidebar jobs={this.props.jobs} onClick={this.onSidebarClick} />
                </main>
            </React.Fragment>
        );
    }
} 

export default Jobs;
