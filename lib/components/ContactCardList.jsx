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
    let sortedList = contactList.sort((a, b) => a.props.lastName > b.props.lastName)



    return(
      <div className="contact-card-container">
        <img src="../images/black-flag.svg" className="show-followup-list-button" onClick={()=> {this.setState({showFollowupList: !this.state.showFollowupList})}}/>
        {sortedList}
      </div>
    )
  }
}
