import React, { Component } from 'react';
import Map from "./Map";
import Form from "./Form";
import Test from "./Test"
class App extends Component {
  state = {
    test: 'abc'
  } 

  
  render() { 
    return (
      <div>
      {/* <Test/> */}
        <Form />
      {/* <Map/> */}
    </div>
    );
  }
}
 
export default App;



