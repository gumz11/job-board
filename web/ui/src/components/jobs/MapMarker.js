import React from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';

class MapMarker extends React.Component {
    constructor(props) {
        super(props);

        this.icon = L.divIcon({ 
            className: 'jb-map-icon',
            html: '<i class="fa fa-map-marker fa-3x"></i>',
            iconSize: [20, 36],
            iconAnchor: [10, 34],
            popupAnchor: [0, -25],
        });

        this.popup = React.createRef();
    }

    componentDidMount() {
        let { lat, 
            lng, 
            group } = this.props;

        if (lat && lng) {
            let marker = L.marker([lat, lng], {
                id: this.props.id,
                icon: this.icon
            }).bindPopup(this.popup.current);

            group.addLayer(marker);
        }
    }

    render() {
        return (
            <div className='jb-popup'>
                <div ref={this.popup}>
                    <Link to={`/job/${this.props.id}`}>{this.props.title}</Link>
                    <p> {this.props.company} - {this.props.location} </p>
                </div>
            </div>
        );
    }
}

export default MapMarker;