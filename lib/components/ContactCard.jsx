import React, { Component } from 'react';
import NewContactForm from './NewContactForm.jsx';
import AddImageButton from './AddImageButton';

export default class ContactCard extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      editable: false,
      image: ''
    };
  }

  addImage(){
    console.log("test2");
  } //end of addImage

  toggleExpand(){
    this.setState({expanded: !this.state.expanded});
  }

  toggleEdit(){
    this.setState({editable: !this.state.editable});
  }

  submitEdit(){

    let newContactInfo;//figure out how to assign this = Contact{}

    this.props.submitEdit(this.props.contactID, newContactInfo);

  }

  render() {
    const { firstName, lastName, companyName, numbers, emails, socialMedia, notes, contactID } = this.props
    let display;
    if (this.state.expanded) {
      display = (<div className="expanded">
      <div className='fullname firstName lastName'>{firstName} {lastName}</div>
      <div className='companyName'>{companyName}</div>
      <div className = 'cell'>{numbers.cell}</div>
      <div className = 'home'>{numbers.home}</div>
      <div className = 'work'>{numbers.work}</div>
      <div className = 'primary-email'>{emails.primary}</div>
      <div className = 'secondary-email'>{emails.secondary}</div>
      <div className = 'facebook'>{socialMedia.facebook}</div>
      <div className = 'twitter'>{socialMedia.twitter}</div>
      <div className = 'linkedIn'>{socialMedia.linkedIn}</div>
      <div className = 'github'>{socialMedia.github}</div>
      <div className = 'instagram'>{socialMedia.instagram}</div>
      <div className='notes'>{notes}</div></div>)
    }
    else {
      display = <div className='fullname firstName lastName'>{firstName} {lastName} {contactID}</div>
    }

    if(this.state.editable){
      display = <NewContactForm handleNewContact={this.submitEdit.bind(this)} {...this.props}/>
    }

    return(
      <div className='contactCardContainer'>
        <button onClick={()=>this.toggleExpand()}>Expand Card</button>
        <button onClick={()=>this.toggleEdit()}>Edit Card</button>
        {display}
        <div className="image">{this.state.image ? <img src='' /> : <AddImageButton handleClick={()=>{this.addImage()}} />}</div>
      </div>

    )
  }
}
