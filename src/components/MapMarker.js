import React from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

class MapMarker extends React.Component {
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
        this.popup = React.createRef();
    }

    componentDidMount() {
        let { lat, 
            lng, 
            group } = this.props;

        if (lat && lng) {
            let marker = L.marker([lat, lng], {
                id: this.props.id
            }).setIcon(this.markerIcon).bindPopup(this.popup.current.cloneNode(true));

            group.addLayer(marker);
        }
    }

    render() {
        return (
            <div className='jb-control' ref={this.popup}>
                <Link to={`/job/${this.props.id}`}>{this.props.title}</Link>
                <p> {this.props.company} - {this.props.location} </p>
            </div>
        );
    }
}

export default MapMarker;