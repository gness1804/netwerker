import React, { Component } from 'react';
import {InputField} from './InputField.jsx';
import ContactCard from './ContactCard.jsx';
import AddImageButton from './AddImageButton';
import FollowupButton from './FollowupButton';

export default class NewContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactID: this.props.contactID || Date.now(),
      firstName: this.props.firstName || '',
      lastName: this.props.lastName || '',
      companyName: this.props.companyName || '',
      numbers: 'cell',
        // cell: this.props.numbers.cell || '',
        // work: this.props.numbers.work || '',
        // home: this.props.numbers.home || ''

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
      image: this.props.image || '',
      followup: this.props.followup || false,
      reader: this.props.fileReaderTest || new FileReader(),

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount(){
    if (this.state.reader !== "test") {
    this.state.reader.addEventListener('load', function(){
        this.setState({imgSource : this.state.reader.result});
    }.bind(this));}
  } //end of componentDidMount

  addImage(e){
    let image = e.target.files[0];
    this.setState({image:image},
        this.state.reader.readAsDataURL(image)
    );

  } //end of addImage

  toggleFollowup(){
    this.setState({followup:!this.state.followup});
  } //end of toggleFollowup

  updateState(e, keyName){
    this.setState({[keyName]: e.target.value});
  }

  updateStateObject(e, keyName, objName){
    var objState = this.state[objName];
    objState[keyName] = e.target.value;
    this.setState({[objName]: objState});
  }

  handleChange(event) {
    this.setState({numbers: event.target.value});
  }

  handleSubmit(event) {
     alert('Select value is: ' + this.state.numbers);
   }


  submitNewContact(){
    const newContact = {
        contactID: this.state.contactID,
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
        followup: this.state.followup
    };
    const image = this.state.image;
    this.props.handleNewContact(newContact, image);
  }
  render(){

    const { firstName, lastName, companyName, numbers, emails, socialMedia, notes, image, followup } = this.state;


    let imgSource;
    let imageDisplay;

    if (this.state.imgSource){
      imageDisplay = (<img src={this.state.imgSource}/>)
    }

    // console.log(this.state)

    return(
      <div className = 'input-field-container'>
        <InputField className='firstName-Input' value = {this.state.firstName} placeholder = 'First Name' type='text' handleChange={this.updateState.bind(this)} name = 'firstName'/>
        <InputField className='lastName-Input' value = {this.state.lastName} placeholder = 'Last Name' type='text' handleChange={this.updateState.bind(this)} name = 'lastName'/><br/>
        <InputField className='companyName-Input' value = {this.state.companyName} placeholder = 'Company Name' type='text' handleChange={this.updateState.bind(this)} name = 'companyName'/>

        <div>
        <select value={this.state.numbers} onChange={this.handleChange}>
          <option value="cell">Cell</option>
          <option value="work">Work</option>
          <option value="home">Home</option>
        </select>
        <InputField className='phoneNumber-Input' value = {this.state.numbers} placeholder = 'Phone Number' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'numbers'/>
      </div>
        {/* <InputField className='cellNumber-Input' value = {this.state.numbers.cell} placeholder = 'cell Number' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'numbers' name = 'cell'/>
        <InputField className='workNumber-Input' value = {this.state.numbers.work} placeholder = 'work Number' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'numbers' name = 'work'/>
        <InputField className='homeNumber-Input' value = {this.state.numbers.home} placeholder = 'home Number' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'numbers' name = 'home'/> */}

        <InputField className='primaryEmail-Input' value = {this.state.emails.primary} placeholder = 'Primary Email' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'emails' name = 'primary'/>
        <InputField className='secondaryEmail-Input' value = {this.state.emails.secondary} placeholder = 'Secondary Email' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'emails' name = 'secondary'/>


        <InputField className='facebook-Input' value = {this.state.socialMedia.facebook} placeholder = 'facebook' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'socialMedia' name = 'facebook'/>
        <InputField className='twitter-Input' value = {this.state.socialMedia.twitter} placeholder = 'twitter' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'socialMedia' name = 'twitter'/>
        <InputField className='linkedIn-Input' value = {this.state.socialMedia.linkedIn} placeholder = 'linkedIn' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'socialMedia' name = 'linkedIn'/>
        <InputField className='github-Input' value = {this.state.socialMedia.github} placeholder = 'github' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'socialMedia' name = 'github'/>
        <InputField className='instagram-Input' value = {this.state.socialMedia.instagram} placeholder = 'instagram' type='text' handleChange={this.updateStateObject.bind(this)} objName = 'socialMedia' name = 'instagram'/>
        <InputField className='notes-input' value = {this.state.notes}  placeholder = 'Notes' type='text' handleChange={this.updateState.bind(this)} name = 'notes'/>
        <AddImageButton handleChange={(e)=>{this.addImage(e)}}/>
        <FollowupButton handleClick={()=>{this.toggleFollowup()}}/>

        {imageDisplay}

        <button className='submit-new-contact-btn' onClick={this.submitNewContact.bind(this)}> Submit New Contact </button>


      </div>
    )
  }

} //end of NewContactForm
