import React, { Component } from 'react';
import {InputField} from './InputField.jsx'

export default class NewContactForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      companyName: '',
      numbers: {
        primary: '',
        cell: '',
        work: '',
        home: ''
      },
      emails: {
        primary:'',
        secondary: ''
      },
      socialMedia: {
        facebook: '',
        twitter: '',
        linkedIn: '',
        github: '',
        instagram: ''
      },
      notes: ''
    }
  }

  updateState(e, keyName){
    this.setState({[keyName]: e.target.value})
  }

  updateStateObject(e, keyName, objName){
    let object = {[keyName] : e.target.value}
    this.setState({[objName]: object })
  }

  render(){
    console.log(this.state);
    return(
      <div className = 'input-field-container'>
        <InputField className='firstName-Input' placeholder = 'First Name' type='text' handleChange={this.updateState.bind(this)} name = 'firstName'/>
        <InputField className='lastName-Input' placeholder = 'Last Name' type='text' handleChange={this.updateState.bind(this)} name = 'lastName'/>
        <InputField className='companyName-Input' placeholder = 'Company Name' type='text' handleChange={this.updateState.bind(this)} name = 'companyName'/>
        <InputField className='primaryNumber-Input' placeholder = 'Primary Number' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'numbers' name = 'primary'/>
      </div>
    )
  }

}
