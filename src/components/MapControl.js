import React from 'react';
import L from 'leaflet';

class MapControl extends React.Component {
    constructor(props) {
        super(props);
        this.control = React.createRef();
    }
    
    componentDidMount() {  
        let Control = L.Control.extend({
            onAdd: () => this.control.current
        });

        new Control().addTo(this.props.map);
    }

    render() {
        return (
            <div ref={this.control} className="jb-control jb-btn" onClick={this.props.control}>
                <i className={`fa fa-${this.props.icon} fa-2x`}></i>
            </div>
        );
    }
}

export default MapControl;