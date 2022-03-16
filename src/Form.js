import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
  state = {
    textField: '',
    error: null,
    isLoaded: false,
    latitude: null,
    longitude: null,
    country: null,
    region: null,
    city: null,
    ip: null,
  }

  componentDidMount() {
    // this.ipApiRequest()
  }

  ipApiRequest = (query) => {
    query ??= ''; //changes query to empty string if null or undefined
    let request = "http://ipwhois.app/json/" + query
    console.log("______request:")
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
          ip: result.data.ip,
        });
        if (this.state.textField === '') {
          this.setState({textField: result.data.ip})
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

  handleSubmit = (event) => {
    event.preventDefault();
    // if (this.state.ip === this.state.textField) return
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
        <section className='w-full h-32 bg-blue-300'>
        <ul>
          <li>{this.state.latitude}</li>     
          <li>{this.state.longitude}</li>     
          <li>{this.state.country}</li>     
          <li>{this.state.region}</li>     
          <li>{this.state.city}</li>     
        </ul>
        </section>
      </div>
    );
  }
}
 
export default Form;