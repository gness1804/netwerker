import React, { Component } from 'react';
import {InputField} from './InputField.jsx'

export default class NewContactForm extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  updateState(e, name){
    this.setState({name: e.target.value})
  }

render(){
  console.log(this.state);
  return(
    <InputField className='firstName-Input' type='text' handleChange={this.updateState.bind(this)}/>
  )
}

}
