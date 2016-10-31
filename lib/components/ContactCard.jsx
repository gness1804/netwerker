import React, { Component } from 'react';
import NewContactForm from './NewContactForm.jsx';
import AddImageButton from './AddImageButton';
import DeleteImageButton from './DeleteImageButton';

export default class ContactCard extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      editable: false,
      contactImgURL: null,
    };
  }

  deleteImage(){

  } //end of deleteImage

  toggleExpand(){

    if(!this.state.expanded){

      console.log(this.props.user.uid, this.props.contactID)
      this.props.imgStorage.child(`${this.props.user.uid}/${this.props.contactID}.jpg`).getDownloadURL()
                        .then((url)=>{
                          console.log(url)
                          this.setState({contactImgURL: url})
                        })
                        .catch(()=>{
                          console.log('error - no image for this contact')
                        })
    }

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

    console.log(this.state.contactImgURL)
    const { firstName, lastName, companyName, numbers, emails, socialMedia, notes, contactID, image } = this.props
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
      <div className='notes'>{notes}</div>
      <div className="image-container">{this.state.contactImgURL ? <img className="image-actual" src={this.state.contactImgURL} /> : <AddImageButton handleClick={()=>{this.addImage()}} />}</div>
      </div>)
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
        <div className="delete-image">{this.props.image ? <DeleteImageButton handleClick={()=>{this.deleteImage()}}/> : ''}</div>
      </div>

    )
  }
}
