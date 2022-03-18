import React, { Component } from 'react';
import axios from 'axios';
import { Result } from 'postcss';

class Form extends Component {
  state = {
    // app data
    textField: '',
    lastQuery: null,
    error: '',
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
    // this.ipApiRequest()
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
        console.log(result)
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
        if (result.data.success === true) {
          this.setState({
            error: '',
            city: result.data.city + ", "
          })
          // update ip field to ip from api call if empty
          if (this.state.textField === '') {
            this.setState({textField: result.data.ip})
          } 
          // pass lat & long to parent element state
          const updateLatLng = this.props.updateLatLng
          updateLatLng(result.data.latitude, result.data.longitude)
        } else {
          this.setState({error: "Error: " + result.data.message})
        }
      },
      error => {
        this.setState({
          isLoaded: true,
          error: error
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
      <div className='text-cyan-900'>
        <section className='flex justify-center w-full p-3 bg-gradient-to-r from-cyan-500 to-blue-500'>
            <form onSubmit={this.handleSubmit} className='flex justify-items-center space-x-4'>
              <fieldset>
                <input className='rounded-md p-1.5 text-cyan-900' type="text" placeholder='IP Address' name="textField" value={this.state.textField} onChange={this.handleChange} />
              </fieldset>
            <input value="Search" type="submit" className='bg-cyan-300 rounded-md p-1.5 cursor-pointer font-bold'/>
          </form>
        </section>
        <section className=' bg-white flex flex-col justify-center align-middle text-center	min-w-fit w-full h-16'>
            <p className='text-md'>{this.state.country}</p>
            <p className='text-lg'>{ this.state.error }{this.state.city}{this.state.region}</p>
        </section>
      </div>
    );
  }
}
 
export default Form;