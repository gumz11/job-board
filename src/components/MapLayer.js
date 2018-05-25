import React from 'react';
import L from 'leaflet';

class MapLayer extends React.Component {
    componentDidMount() {
        L.gridLayer.googleMutant({
            styles: [
                {featureType: 'water', stylers: [{color: '#444444'}]},
                {featureType: 'landscape', stylers: [{color: '#eeeeee'}]},
            ],
            type: 'roadmap'
        }).addTo(this.props.map);
    }

    render() {
        return (null);
    }
}

export default MapLayer;