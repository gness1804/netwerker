import React, { Component } from 'react';
import { map, extend } from 'lodash';
import firebase, { signIn, signOut } from '../firebase';
import Header from './Header.jsx'
import NewContactForm from './NewContactForm.jsx';
import ContactCardList from './ContactCardList.jsx';

class Application extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      contacts: [],
      contactDatabase: null,
      contactImgStorage: null,
      showAddForm: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user =>
      this.assignDatabaseReferences(user)
    );
  }

  assignDatabaseReferences = (user) => {
    this.setState({
      user,
      contactDatabase: user ? firebase.database().ref(user.uid) : null,
      contactImgStorage: user ? firebase.storage().ref() : null,
    },
      () => {
        this.createDatabaseEventListener(user);
      }
    );
  }
  createDatabaseEventListener = (user) => {
    if (user) {
      firebase.database().ref(user.uid).on('value', (snapshot) => {
        const contacts = snapshot.val() || {};
        this.setState({
          contacts: map(contacts, (val, key) => extend(val, { key })),
        });
      });
    } else {
      this.setState({
        contacts: [],
      });
    }
  }

  toggleShowAddForm = () => {
    this.setState({ showAddForm: !this.state.showAddForm });
  }

  addNewContact = (newContactInfo, image) => {
    this.state.contactDatabase.push(newContactInfo);
    if (image) {
      this.state.contactImgStorage.child(`${this.state.user.uid}/${newContactInfo.contactID}.jpg`).put(image);
    }
    this.setState({ showAddForm: false });
  }

  editContact = (contactID, newContactInfo, image) => {
    this.state.contactDatabase.child(`${contactID}`).set(newContactInfo);
    if (image) {
      this.state.contactImgStorage.child(`${this.state.user.uid}/${newContactInfo.contactID}.jpg`).put(image);
    }
  }

  toggleFollowup = (contactID, followup) => {
    this.state.contactDatabase.child(`${contactID}`).child('followup').set(followup);
  }

  deleteContact = (contactID) => {
    this.state.contactDatabase.child(`${contactID}`).remove();
  }

  render() {
    const { user } = this.state;

    let pageDisplay;

    if (this.state.showAddForm) {
      pageDisplay = (
        <NewContactForm
          handleNewContact = {this.addNewContact}
          numbers = {{}}
          emails = {{}}
          socialMedia = {{}}
        />
      );
    } else {
      pageDisplay = (
        <ContactCardList
          user = {this.state.user}
          imgStorage = {this.state.contactImgStorage}
          contacts = {this.state.contacts}
          submitEdit = {this.editContact}
          toggleFollowup = {this.toggleFollowup}
          deleteContact = {this.deleteContact}
        />
      );
    }
    return (
      <div className = "application">
        <Header user = {this.state.user} handleShowForm = {()=>this.toggleShowAddForm()} showForm = {this.state.showAddForm} />
        <main className = "contact-Container">
          {pageDisplay}
        </main>
      </div>
    );
  }
}


export default Application;
