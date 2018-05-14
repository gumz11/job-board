import React from 'react';
import { Link } from 'react-router-dom'
import L from 'leaflet';

class JobsMarker extends React.Component {
    constructor(props) {
        super(props);
        this.popup = React.createRef();
    }
    componentDidMount() {
        let { lat, 
            lng, 
            markerIcon,
            layer } = this.props;

        let marker = L.marker([lat, lng]).setIcon(markerIcon).bindPopup(this.popup.current);

        layer.addLayer(marker);
    }
    render() {
        return (
            <div className='jb-control' ref={this.popup}>
                <Link to={`job/${this.props.id}`}>{this.props.title}</Link>
                <p> {this.props.company} - {this.props.location} </p>
            </div>   
        );
    }
}

export default JobsMarker;