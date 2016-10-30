import React, { Component } from 'react'
import NewContactForm from './NewContactForm.jsx'

export default class ContactCard extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      editable: false
    };
  }

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
        <div className="image">{this.props.image ? <img src={this.props.imgSrc} /> : <button>Add Image</button>}</div>
      </div>

      // <div className='active-user'>{user ?
      //   <p>Logged in as <span className="bold">{user.displayName}</span> ({user.email})  <button className='auth-button button' onClick={()=> signOut()}>Sign Out</button>
      //   </p>
      // : <button className='auth-button' onClick={() => signIn()}>Sign In</button> }
      // <button onClick={()=>this.addNewContact()}>Add Contact</button>
      // </div>

    )
  }
}
