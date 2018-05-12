import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

class JobsMap extends React.Component {
    componentDidMount() {
        this.map = L.map('map', {
            center: [0, 0],
            zoom: 3
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        let Search = L.Control.extend({
            onAdd: (map) => document.querySelector('div.jb-control')
        });

        this.search = new Search();

        this.map.addControl(this.search);
    }
    render() {
        return (
            <React.Fragment>
                <div className="jb-control jb-btn"><i className="fas fa-search fa-2x"></i></div>
                <div className="jb-fill" id="map"></div>
            </React.Fragment>
        );
    }
} 

export default JobsMap;
