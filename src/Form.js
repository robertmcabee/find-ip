import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
  state = {
    // app data
    textField: '',
    lastQuery: null,
    error: null,
    isLoaded: false,
    // data from api
    latitude: null,
    longitude: null,
    country: null,
    region: null,
    city: null,
    ip: null,
  }

  componentDidMount() {
    this.ipApiRequest()
  }

  ipApiRequest = (query) => {
    // change query to empty string if null or undefined
    query ??= '';
    let request = "https://ipwhois.app/json/" + query
    // check for duplicate api call
    if (this.state.lastQuery === request) {
      console.log("duplicate query")
      return
    } else {
      this.setState({lastQuery: request});
    }
    // make api request
    axios.get(request).then(
      result => {
        // update state
        this.setState({
          isLoaded: true,
          latitude: result.data.latitude,
          longitude: result.data.longitude,
          country: result.data.country,
          region: result.data.region,
          city: result.data.city,
          ip: result.data.ip,
        });
        // update ip field to ip from api call if empty
        if (this.state.textField === '') {
          this.setState({textField: result.data.ip})
        } 
        // pass lat & long to parent element state
        const updateLatLng = this.props.updateLatLng
        updateLatLng(result.data.latitude, result.data.longitude)
      },
      error => {
        this.setState({
          isLoaded: true,
          error
        });
      }
      );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.ipApiRequest(this.state.textField)
  }

  handleChange = (event) => this.setState({textField: event.target.value})

  render() { 
    return (
      <div>
        <section className='w-full h-18 bg-blue-400 p-3'>
            <form onSubmit={this.handleSubmit} className='flex justify-items-center space-x-4'>
              <fieldset>
                <label htmlFor="textField">IP:</label>
                <input type="text" name="textField" value={this.state.textField} onChange={this.handleChange} />
              </fieldset>
            <input value="Submit" type="submit"/>
          </form>
        </section>
        <section className='w-full bg-blue-300'>
          <p>{this.state.country}</p>
          <p>{this.state.city}, {this.state.region}</p>
        </section>
      </div>
    );
  }
}
 
export default Form;