import React, { Component } from 'react';
import { filter, includes, values } from 'lodash';
import ContactCard from './ContactCard.jsx';

export default class ContactCardList extends Component {
  constructor() {
    super();
    this.state = {
      showFollowupList: false,
      filteredContacts: [],
      searchString: '',
    };
  }
  searchContacts = (e) => {
    this.setState(
      { searchString: e.target.value });
  }
  render() {
    let contactArray = this.props.contacts;
    if (this.state.searchString) {
      contactArray = filter(contactArray, (contact) => {
        const fullName = `${contact.firstName} ${contact.lastName}`;
        const testArray = values(contact);
        let testResult;
        testArray.forEach((key) => {
          if (typeof (key) === 'object') {
            const keyArray = values(key);
            keyArray.forEach((keyString) => {
              const result = includes(keyString.toLowerCase(),
              this.state.searchString.toLowerCase());
              if (result) testResult = true;
            });
          } else {
            let keyString = key;
            if (typeof (key) === 'string') {
              keyString = key.toLowerCase();
            }
            const result = includes(keyString, this.state.searchString.toLowerCase());
            if (result) testResult = true;
          }
        }
      );
        testResult = (includes(fullName.toLowerCase(), this.state.searchString.toLowerCase()) || testResult);

        return testResult;
      });
    }

    if (this.state.showFollowupList) {
      contactArray = contactArray.filter((contact) => { return contact.followup; });
    }
    let contactList;

    if (contactArray) {
      contactList = contactArray.map(c =>
        <ContactCard
          {...c}
          user={this.props.user}
          imgStorage={this.props.imgStorage}
          contactImgID={c.contactID}
          contactTextID={c.key}
          key={c.key}
          submitEdit = {this.props.submitEdit}
          toggleFollowup={this.props.toggleFollowup}
          deleteContact = {this.props.deleteContact}
        />
      );
    }
    const sortedList = contactList.sort((a, b) => a.props.lastName > b.props.lastName);
    return (
      <div className="contact-card-container">

        {this.props.user ?
          <div>
            <span className="follow-up-label">Show:
            <img
              alt="mark as follow up"
              src="../images/black-flag.svg"
              className="show-followup-list-button"
              onClick={() => {
                this.setState({
                  showFollowupList: !this.state.showFollowupList,
                });
              }}
            />
            </span>
            <input
              className="search"
              placeholder="search"
              aria-label="Search Contacts"
              onChange={(e) => {
                this.searchContacts(e);
              }}
            />
          </div>
          :
          <div>
          <span className = 'sign-in-text'>Please Sign In</span>
          <img
            className = "cute-pug-pic"
            alt = "a really cute pug"
            src = "../images/cutepug.jpeg"
          />
          </div>
        }
        {sortedList}
        <div className="empty-card"></div>
      </div>
    );
  }
}
