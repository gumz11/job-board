import React from 'react';
import L from 'leaflet';

import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import 'leaflet.gridlayer.googlemutant/Leaflet.GoogleMutant.js';
import 'leaflet/dist/leaflet.css';

import Message from './Message';
import MapLayer from './MapLayer';
import Control from './Control';
import MapMarker from './MapMarker';
import Sidebar from './Sidebar';

class JobsMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            section: {
                display: '',
                icon: 'left'   
            }, 
            map: null 
        };
        this.group = L.markerClusterGroup();
    }

    asideControl = (cb) => {
        this.setState(prevState => ({
            section: prevState.section.display ? {
                display: '',
                icon: 'left'
            } : {
                display: 'hidden',
                icon: 'right'
            }
        }), typeof cb === 'function' ? cb : undefined);
    }

    onSidebarClick = (markerData) => {
        let markers = this.group.getLayers(),
            marker = markers.find((m) => m.options.id === markerData.id);

        if (marker) {
            if (this.state.section.display) {
                this.asideControl(() => {
                    this.state.map.invalidateSize();
                    this.centerAndOpenPopup(marker);
                });
            } else {
                this.centerAndOpenPopup(marker);
            }
        }
    }

    centerAndOpenPopup(marker) {
        this.centerMap(marker.__parent.getBounds(), () => {
            this.recursiveZoomOrSpiderfy(marker);
        });
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
                <main className="jb-main jb-fill jb-row">
                    <Message searching={this.props.searching} error={this.props.error} />
                    <div className="jb-controls">
                        <Control icon={`angle-double-${this.state.section.icon}`} control={this.asideControl} />
                    </div>
                    <section className={`jb-fill jb-column jb-${this.state.section.display}`}>
                        <div className="jb-fill" id="map">
                        </div>
                        {this.state.map && 
                            <React.Fragment>
                                <MapLayer map={this.state.map} />
                                {this.props.jobs.map((m) => 
                                    <MapMarker {...m} group={this.group} key={m.id} /> 
                                )}
                            </React.Fragment>
                        }
                    </section>
                    <Sidebar jobs={this.props.jobs} onClick={this.onSidebarClick} />
                </main>
            </React.Fragment>
        );
    }
} 

export default JobsMap;
