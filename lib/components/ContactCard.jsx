import React, { Component } from 'react';
import NewContactForm from './NewContactForm.jsx';
import AddImageButton from './AddImageButton';
import DeleteImageButton from './DeleteImageButton';
import FollowupButton from './FollowupButton';

export default class ContactCard extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      editable: false,
      contactImgURL: null

    };
  }

  deleteImage(){

  } //end of deleteImage

  toggleExpand(){

    if(!this.state.expanded){

      if (!this.props.test) {
      this.props.imgStorage.child(`${this.props.user.uid}/${this.props.contactImgID}.jpg`).getDownloadURL()
                        .then((url)=>{
                          console.log(url)
                          this.setState({contactImgURL: url})
                        })
                        .catch(()=>{
                          console.log('error - no image for this contact')
                        })
                      }
    }

    this.setState({expanded: !this.state.expanded});
  }

  toggleEdit(){
    this.setState({editable: !this.state.editable});
  }

  toggleFollowup(){

      this.props.toggleFollowup(this.props.contactTextID, !this.props.followup)
  }

  submitEdit(newContact, newImage){

    let newContactInfo = newContact;

    this.props.submitEdit(this.props.contactTextID, newContactInfo, newImage);

    this.toggleEdit();
  }

  render() {
    const { firstName, lastName, companyName, numbers, emails, socialMedia, notes, contactID, image, followup } = this.props
    let display;
    if (this.state.expanded) {
      display = (<div className="expanded">
      <div className='fullname firstName lastName'>Name: {firstName} {lastName}</div>
      <div className='companyName'>Company: {companyName}</div>
      <div className = 'cell'>Cell Number: {numbers.cell}</div>
      <div className = 'home'>Home Number: {numbers.home}</div>
      <div className = 'work'>Work Number: {numbers.work}</div>
      <div className = 'primary-email'>Email: {emails.primary}</div>
      <div className = 'secondary-email'>Email: {emails.secondary}</div>
      <div className = 'facebook'>Facebook: {socialMedia.facebook}</div>
      <div className = 'twitter'>Twitter: {socialMedia.twitter}</div>
      <div className = 'linkedIn'>LinkedIn:{socialMedia.linkedIn}</div>
      <div className = 'github'>Github: {socialMedia.github}</div>
      <div className = 'instagram'>Instagram: {socialMedia.instagram}</div>
      <div className='notes'>Notes: {notes}</div>
      <div className="image-container">{this.state.contactImgURL ? <img className="image" src={this.state.contactImgURL} /> : <AddImageButton handleClick={()=>{this.addImage()}} />}</div>

      </div>)
    }
    else {
      display = <div className='fullname firstName lastName'>{firstName} {lastName}</div>
    }

    if(this.state.editable){
      display = <NewContactForm handleNewContact={this.submitEdit.bind(this)} {...this.props}/>
    }

    return(
      <div className='contact-card-for-each-contact'>
        <div className="contact-card-top-buttons-container">
          {followup ? <img src="../images/yellow-flag.svg" alt="" className="flagged-for-followup-button" onClick={()=>this.toggleFollowup()}/> :   <img src="../images/gray-flag.svg" alt="" className="not-flagged-for-followup-button" onClick={()=>this.toggleFollowup()}/>}
          <img src="../images/edit.png" alt="Icon to show that user can edit the contact card." className="edit-button" onClick={()=>this.toggleEdit()}/>
          <img src="../images/thin-down.svg" alt="Icon to show that user can expand the contact card." className="expand-button" onClick={()=>this.toggleExpand()}/>
        </div>
        {display}
        <div className="delete-image">{this.props.image ? <DeleteImageButton handleClick={()=>{this.deleteImage()}}/> : ''}</div>
      </div>

    )
  }
}
