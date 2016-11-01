import React, { Component } from 'react'
import NewContactForm from './NewContactForm.jsx'
import ContactCard from './ContactCard.jsx';


export default class ContactCardList extends Component {
  constructor() {
    super();
    this.state = {

    };
  }
  render() {

    let contactArray = this.props.contacts;

    let contactList;

    if(contactArray) {
      contactList =  contactArray.map(c => <ContactCard {...c} user={this.props.user} imgStorage={this.props.imgStorage} contactImgID={c.contactID} contactTextID={c.key} key={c.key} submitEdit = {this.props.submitEdit} toggleFollowup={this.props.toggleFollowup}/>)
    }

    return(
      <div>
        {contactList}
      </div>
    )
  }
}
