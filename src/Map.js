import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const Map = () => {
  
  const mapStyles = {        
    height: "100vh",
    width: "100%"};
  
  const defaultCenter = {
    lat: 64.120741, lng: -21.939640
  }
  
  return (
     <LoadScript googleMapsApiKey={ process.env.REACT_APP_GOOGLE_MAPS_API_KEY }>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={9}
          center={defaultCenter}
        />
     </LoadScript>
  )
}

export default Map;