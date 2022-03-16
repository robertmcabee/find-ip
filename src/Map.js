import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';

const Map = () => {

  const [ipLocation, setIpLocation] = useState({});

  const updateLocation = (latitude, longitude) => {
    const ipLocation = {
      lat: latitude,
      lng: longitude
    }
    setIpLocation(ipLocation)
  }
    
  
  const mapStyles = {
    height: "100vh", width: "100%"
  };
  
  const defaultCenter = {
    lat: 64.120741, lng: -21.939640
  }
  
  return (
    <div className='w-full'>
      <button className='m-2 p-1 bg-orange-200' onClick={()=>updateLocation(41.3851, 2.1734)}>Barcelona</button>
      <button className='m-2 p-1 bg-orange-200' onClick={()=>updateLocation(48.854014, 2.323871)}>Paris</button>
      <LoadScript googleMapsApiKey={ process.env.REACT_APP_GOOGLE_MAPS_API_KEY }>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={6}
            center={ipLocation}>
          <Marker position={ ipLocation }/>
      </GoogleMap>

      </LoadScript>

    </div>
  )
}

export default Map;