import React, {Component} from "react";
import {GoogleApiWrapper, Map, Marker} from "google-maps-react";

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        mapCenter: {
            lat: this.props['lat'],
            lng: this.props['lng']
        }
    };

    onMarkerClick = (props, marker) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });


    render() {
        return (
            <Map google={this.props['google']}
                 style={{width: '100%'}}
                 initialCenter={{
                     lat: this.state.mapCenter.lat,
                     lng: this.state.mapCenter.lng
                 }}
            >
                <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyDkXxBec2hJjj5QMNBnqaYzAROJCwP6CzQ')
})(MapContainer)
