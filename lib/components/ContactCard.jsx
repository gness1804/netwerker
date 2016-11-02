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
      <FollowupButton handleClick={()=>{this.toggleFollowup()}}/>
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
      <div className='notes'>{notes}</div>
      <div className="image-container">{this.state.contactImgURL ? <img className="image" src={this.state.contactImgURL} /> : <AddImageButton handleClick={()=>{this.addImage()}} />}</div>
      <div className="followup-container">{followup ? <div><p>Flagged for Followup!</p> <FollowupButton handleClick={()=>{this.toggleFollowup()}}/></div> : <FollowupButton handleClick={()=>{this.toggleFollowup()}}/>}</div>
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
