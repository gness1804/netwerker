import React, { Component } from 'react'
import NewContactForm from './NewContactForm.jsx'
import ContactCard from './ContactCard.jsx';


export default class ContactCardList extends Component {
  constructor() {
    super();
    this.state = {
      showFollowupList: false
    };
  }
  render() {

    let contactArray = this.props.contacts;

    if (this.state.showFollowupList) {
      contactArray = contactArray.filter((contact)=>{return contact.followup})
    }
    let contactList;

    if(contactArray) {
      contactList =  contactArray.map(c => <ContactCard {...c} user={this.props.user} imgStorage={this.props.imgStorage} contactImgID={c.contactID} contactTextID={c.key} key={c.key} submitEdit = {this.props.submitEdit} toggleFollowup={this.props.toggleFollowup}/>)
    }
    

    return(
      <div>
        <button onClick={()=> {this.setState({showFollowupList: !this.state.showFollowupList})}}>Show Follow Up List</button>
        {contactList}
      </div>
    )
  }
}
