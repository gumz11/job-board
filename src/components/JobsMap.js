import React from 'react';
import L from 'leaflet';

import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import 'leaflet.gridlayer.googlemutant/Leaflet.GoogleMutant.js';
import 'leaflet/dist/leaflet.css';

import Header from './Header';
import MapMessage from './MapMessage';
import MapLayer from './MapLayer';
import MapControl from './MapControl';
import MapMarker from './MapMarker';
import JobsSidebar from './JobsSidebar';

class JobsMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = { header: 'hidden', map: null };
        this.group = L.markerClusterGroup();
    }

    headerControl = () => {
        this.setState(prevState => ({
            header: prevState.header ? '' : 'hidden'
        }));
    }

    onSidebarClick = (markerData) => {
        let markers = this.group.getLayers(),
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
            if (cb) this.state.map.once('moveend', cb);
            this.state.map.fitBounds(bounds);
        }
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.searching && !this.props.searching) {
            this.centerMap(this.group.getBounds());
        }

        if (this.props.jobs.length === 0) {
            this.group.clearLayers();
        }

        this.state.map.invalidateSize();
    }
    
    componentDidMount() {       
        this.setState({
            map: L.map('map', {
                center: [0, 0],
                zoom: 2,
                maxZoom: 14
            })
        }, () => {
            this.group.addTo(this.state.map);

            if (this.props.jobs.length) {
                this.centerMap(this.group.getBounds());
            }
        });
    }
    
    render() {
        return (
            <React.Fragment>
                <Header className="jb-job-header" nav="hidden" display={this.state.header} onSearch={this.props.onSearch} />
                <main className="jb-main jb-fill jb-row">
                    {(this.props.searching || this.props.error) && <MapMessage error={this.props.error}/>}
                    <section className="jb-fill jb-column">
                        <div className="jb-fill" id="map">
                        </div>
                        {this.state.map && 
                            <React.Fragment>
                                <MapLayer map={this.state.map} />
                                <MapControl icon="search" control={this.headerControl} map={this.state.map} />
                                {this.props.jobs.map((m) => 
                                    <MapMarker {...m} group={this.group} key={m.id} /> 
                                )}
                            </React.Fragment>
                        }
                    </section>
                    <JobsSidebar jobs={this.props.jobs} onClick={this.onSidebarClick} />
                </main>
            </React.Fragment>
        );
    }
} 

export default JobsMap;
