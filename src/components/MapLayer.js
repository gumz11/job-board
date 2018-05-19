import React from 'react';
import L from 'leaflet';

class MapLayer extends React.Component {
    componentDidMount() {
        L.gridLayer.googleMutant({
            styles: [
                // {elementType: 'labels.text.stroke', stylers: [{visibility: 'off'}]},
                {featureType: 'water', stylers: [{color: '#444444'}]},
                {featureType: 'landscape', stylers: [{color: '#eeeeee'}]},
                // {featureType: 'road', stylers: [{visibility: 'off'}]},
                // {featureType: 'poi', stylers: [{visibility: 'off'}]},
                // {featureType: 'transit', stylers: [{visibility: 'off'}]},
                // {featureType: 'administrative', stylers: [{visibility: 'off'}]},
                // {featureType: 'administrative.locality', stylers: [{visibility: 'off'}]}
            ],
            type: 'roadmap'
        }).addTo(this.props.map);
    }

    render() {
        return (null);
    }
}

export default MapLayer;