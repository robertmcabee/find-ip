import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

class Map extends Component {
  state = { 
    latitude: this.props.latitude,
    longitude: this.props.longitude,
   } 
  render() { 
    return (
      <div className='h-full'>
        <LoadScript googleMapsApiKey={ process.env.REACT_APP_GOOGLE_MAPS_API_KEY }>
          <GoogleMap
            mapContainerStyle={{ height: "75vh", width: "100%" }}
            zoom={8}
            center={{
              lat: this.props.latitude,
              lng: this.props.longitude
            }}>
            <Marker position={{
              lat: this.props.latitude,
              lng: this.props.longitude
            }}/>
        </GoogleMap>
        </LoadScript>
      </div>
    );
  }
}
 
export default Map;