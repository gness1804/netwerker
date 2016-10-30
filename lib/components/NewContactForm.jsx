import React, { Component } from 'react';
import {InputField} from './InputField.jsx';
import ContactCard from './ContactCard.jsx';

export default class NewContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.firstName || '',
      lastName: this.props.lastName || '',
      companyName: this.props.companyName || '',
      numbers: {
        cell: this.props.numbers.cell || '',
        work: this.props.numbers.work || '',
        home: this.props.numbers.home || ''
      },
      emails: {
        primary: this.props.emails.primary || '',
        secondary: this.props.emails.secondary || ''
      },
      socialMedia: {
        facebook: this.props.socialMedia.facebook || '',
        twitter: this.props.socialMedia.twitter || '',
        linkedIn: this.props.socialMedia.linkedIn || '',
        github: this.props.socialMedia.github || '',
        instagram: this.props.socialMedia.instagram || ''
      },
      notes: this.props.notes || '',
      image: this.props.image || ''
    };
  }

  updateState(e, keyName){
    this.setState({[keyName]: e.target.value});
  }

  updateStateObject(e, keyName, objName){
    var objState = this.state[objName];
    objState[keyName] = e.target.value;
    this.setState([objName]: objState)
  }

  submitNewContact(){
    const newContact = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        companyName: this.state.companyName,
        numbers: {
          cell: this.state.numbers.cell,
          work: this.state.numbers.work,
          home: this.state.numbers.home
        },
        emails: {
          primary: this.state.emails.primary,
          secondary: this.state.emails.secondary
        },
        socialMedia: {
          facebook: this.state.socialMedia.facebook,
          twitter: this.state.socialMedia.twitter,
          linkedIn: this.state.socialMedia.linkedIn,
          github: this.state.socialMedia.github,
          instagram: this.state.socialMedia.instagram
        },
        notes: this.state.notes,
        image: this.state.image
    };
    this.props.handleNewContact(newContact);
  }
  render(){
    console.log('test');
    console.log(this.props.firstName)
    const { firstName, lastName, companyName, numbers, emails, socialMedia, notes } = this.state

    return(
      <div className = 'input-field-container'>
        <InputField className='firstName-Input' value = {this.props.firstName} placeholder = 'First Name' type='text' handleChange={this.updateState.bind(this)} name = 'firstName'/>
        <InputField className='lastName-Input' value = {this.props.lastName} placeholder = 'Last Name' type='text' handleChange={this.updateState.bind(this)} name = 'lastName'/>
        <InputField className='companyName-Input' value = {this.props.companyName} placeholder = 'Company Name' type='text' handleChange={this.updateState.bind(this)} name = 'companyName'/>
        <InputField className='cellNumber-Input' value = {this.props.numbers.cell} placeholder = 'cell Number' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'numbers' name = 'cell'/>
        <InputField className='workNumber-Input' value = {this.props.numbers.work} placeholder = 'work Number' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'numbers' name = 'work'/>
        <InputField className='homeNumber-Input' value = {this.props.numbers.home} placeholder = 'home Number' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'numbers' name = 'home'/>
        <InputField className='primaryEmail-Input' value = {this.props.emails.primary} placeholder = 'Primary Email' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'emails' name = 'primary'/>
        <InputField className='secondaryEmail-Input' placeholder = 'Secondary Email' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'emails' name = 'secondary'/>
        <InputField className='facebook-Input' value = {this.props.emails.secondary} placeholder = 'facebook' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'socialMedia' name = 'facebook'/>
        <InputField className='twitter-Input' placeholder = 'twitter' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'socialMedia' name = 'twitter'/>
        <InputField className='linkedIn-Input' placeholder = 'linkedIn' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'socialMedia' name = 'linkedIn'/>
        <InputField className='github-Input' placeholder = 'github' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'socialMedia' name = 'github'/>
        <InputField className='instagram-Input' placeholder = 'instagram' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'socialMedia' name = 'instagram'/>
        <InputField className='notes-input' placeholder = 'Notes' type='text' handleChange={this.updateState.bind(this)} name = 'notes'/>

        <button className='submit-new-contact-btn' onClick={this.submitNewContact.bind(this)}> Submit New Contact </button>


      </div>
    )
  }

}
