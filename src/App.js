import React, { Component } from 'react';
import Map from "./Map";
import Form from "./Form";
import Test from "./Test"
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
      <div>
      {/* <Test/> */}
        <Form updateLatLng={this.updateLatLng} />
        <Map latitude={this.state.latitude} longitude={this.state.longitude} />
    </div>
    );
  }
}
 
export default App;



