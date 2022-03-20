import React, { Component } from 'react';
import './index.css';
import Map from "./Map";
import Form from "./Form";
import Footer from './Footer';
class App extends Component {
  constructor(props) {
    super(props)
    this.updateLatLng = this.updateLatLng.bind(this)
  }

  updateLatLng(latitude, longitude) {
    this.setState({
      latitude: latitude,
      longitude: longitude
    })
  }
  
  state = {
    latitude: null,
    longitude: null,
  } 

  render() { 
    return (
      <div className='font-sans'>
        <Form updateLatLng={this.updateLatLng} /> 
        <Map latitude={this.state.latitude} longitude={this.state.longitude} />
        <Footer />
      </div>
    );
  }
}
 
export default App;



