import React, { Component } from 'react';
import {InputField} from './InputField.jsx'
import ContactCard from './ContactCard.jsx';

export default class NewContactForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      companyName: '',
      numbers: {
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
    this.setState({[objName]: object } )// we have a problem here.
  }

  render(){
    // console.log(this.state);
    return(
      <div className = 'input-field-container'>
        <InputField className='firstName-Input' placeholder = 'First Name' type='text' handleChange={this.updateState.bind(this)} name = 'firstName'/>
        <InputField className='lastName-Input' placeholder = 'Last Name' type='text' handleChange={this.updateState.bind(this)} name = 'lastName'/>
        <InputField className='companyName-Input' placeholder = 'Company Name' type='text' handleChange={this.updateState.bind(this)} name = 'companyName'/>
        <InputField className='cellNumber-Input' placeholder = 'cell Number' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'numbers' name = 'cell'/>
        <InputField className='workNumber-Input' placeholder = 'work Number' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'numbers' name = 'work'/>
        <InputField className='homeNumber-Input' placeholder = 'home Number' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'numbers' name = 'home'/>
        <InputField className='primaryEmail-Input' placeholder = 'Primary Email' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'emails' name = 'primary'/>
        <InputField className='secondaryEmail-Input' placeholder = 'Secondary Email' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'emails' name = 'secondary'/>
        <InputField className='facebook-Input' placeholder = 'facebook' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'socialMedia' name = 'facebook'/>
        <InputField className='twitter-Input' placeholder = 'twitter' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'socialMedia' name = 'twitter'/>
        <InputField className='linkedIn-Input' placeholder = 'linkedIn' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'socialMedia' name = 'linkedIn'/>
        <InputField className='github-Input' placeholder = 'github' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'socialMedia' name = 'github'/>
        <InputField className='instagram-Input' placeholder = 'instagram' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'socialMedia' name = 'instagram'/>
        <InputField className='notes-input' placeholder = 'Notes' type='text' handleChange={this.updateState.bind(this)} name = 'notes'/>

        <ContactCard contactInfo= {this.state} />

      </div>
    )
  }

}
