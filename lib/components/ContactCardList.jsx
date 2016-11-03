import React, { Component } from 'react'
import NewContactForm from './NewContactForm.jsx'
import ContactCard from './ContactCard.jsx';
import { filter, includes } from 'lodash';
import {contains} from 'underscore';


export default class ContactCardList extends Component {
  constructor() {
    super();
    this.state = {
      showFollowupList: false,
      filteredContacts: [],
      searchString : ""
    };
  }

  searchContacts(e) {
    this.setState(
      {searchString: e.target.value});
    }


  render() {

    let contactArray = this.props.contacts;

    if (this.state.showFollowupList) {
      contactArray = contactArray.filter((contact)=>{return contact.followup})
    }
    let contactList;

    if(contactArray) {
      contactList =  contactArray.map(c => <ContactCard {...c} user={this.props.user} imgStorage={this.props.imgStorage} contactImgID={c.contactID} contactTextID={c.key} key={c.key} submitEdit = {this.props.submitEdit} toggleFollowup={this.props.toggleFollowup} deleteContact = {this.props.deleteContact}/>)
    }



  let sortedList = contactList.sort((a, b) => a.props.lastName > b.props.lastName)

  if (this.state.searchString) {
      sortedList = filter(sortedList, (contact) => {
      return includes(contact.props, this.state.searchString)
   })}

    return(
      <div className="contact-card-container">
        <span className='follow-up-label'> Show: 
        <img src="../images/black-flag.svg" className="show-followup-list-button" onClick={()=> {this.setState({showFollowupList: !this.state.showFollowupList})}}/></span>
        <input className="search" placeholder="search" onChange={(e)=> {this.searchContacts(e)}}/>
        {sortedList}
      </div>
    )
  }
}
