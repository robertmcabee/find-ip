import React, { Component } from "react";
import axios from 'axios';

export default class Form extends Component {
  state = {
    textField: '',
    ipQuery: '',
    error: null,
    isLoaded: false,
    latitude: null,
    longitude: null,
    country: null,
    region: null,
    city: null,
  };

  componentDidMount() {
    this.ipApiRequest()
  }

  ipApiRequest = () => {
    let request = "http://ipwhois.app/json/"
    if (this.state.ipQuery !== undefined) {
      request += this.state.ipQuery
    } 
    console.log(request)
    axios.get(request).then(
      result => {
        console.log(result)
        this.setState({
          isLoaded: true,
          latitude: result.data.latitude,
          longitude: result.data.longitude,
          country: result.data.country,
          region: result.data.region,
          city: result.data.city,
        });
        if (this.state.ipQuery === '') {
          this.setState({ipQuery: result.data.ip})
        } 
      },
      error => {
        this.setState({
          isLoaded: true,
          error
        });
      }
      );
  }



  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          <li>{this.state.latitude}</li>     
          <li>{this.state.longitude}</li>     
          <li>{this.state.country}</li>     
          <li>{this.state.region}</li>     
          <li>{this.state.city}</li>     
        </ul>
      );
    }
  }
}