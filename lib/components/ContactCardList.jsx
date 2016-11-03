import React, { Component } from 'react'
import NewContactForm from './NewContactForm.jsx'
import ContactCard from './ContactCard.jsx';
import { filter, includes , values} from 'lodash';
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

    let searchStringArray = this.state.searchString.split('');

    if (this.state.searchString) {

      contactArray = filter(contactArray, (contact)=>{
          let fullName = '';
          fullName = fullName.concat(contact.firstName+' '+contact.lastName)
          console.log(fullName);
          let testArray = values(contact);

          var testResult;
          testArray.forEach((key)=>{
            if(typeof(key) === 'object') {
              let keyArray = values(key)
              keyArray.forEach((keyString)=>{
                  let result = includes(keyString.toLowerCase(), this.state.searchString.toLowerCase())
                  if(result) testResult = true;
              })
            } else {
                if(typeof(key)==='string'){
                  key = key.toLowerCase()
                }
                let result = includes(key, this.state.searchString.toLowerCase())
                if(result) testResult = true;
              }
            }
          )

          testResult = includes(fullName.toLowerCase(), this.state.searchString.toLowerCase())

          return testResult;
      })
    }

    if (this.state.showFollowupList) {
      contactArray = contactArray.filter((contact)=>{return contact.followup})
    }
    let contactList;

    if(contactArray) {
      contactList =  contactArray.map(c => <ContactCard {...c} user={this.props.user} imgStorage={this.props.imgStorage} contactImgID={c.contactID} contactTextID={c.key} key={c.key} submitEdit = {this.props.submitEdit} toggleFollowup={this.props.toggleFollowup} deleteContact = {this.props.deleteContact}/>)
    }



  let sortedList = contactList.sort((a, b) => a.props.lastName > b.props.lastName)



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
