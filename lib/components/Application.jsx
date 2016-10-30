import React, { Component } from 'react'
import firebase, { contactsFromDatabase, signIn, signOut } from '../firebase';
import {split, pick, map, extend } from 'lodash';
import moment from 'moment';
import NewContactForm from './NewContactForm.jsx';
import ContactCard from './ContactCard.jsx'


// let contactsFromDatabase;

export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      contacts: [],
      contactDatabase: null
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => this.setState({ user, contactDatabase: firebase.database().ref(user.uid) }));
  }

  addNewContact(contact){
    this.state.contactDatabase.push(contact)
  }

  render() {
    const { user } = this.state;
    console.log(this.state);
    return(
      <div className = 'application'>

        <div className='active-user'>{user ?
          <p>Logged in as <span className="bold">{user.displayName}</span> ({user.email})  <button className='auth-button button' onClick={()=> signOut()}>Sign Out</button>
          </p>
        : <button className='auth-button' onClick={() => signIn()}>Sign In</button> }
        <button onClick={()=>this.addNewContact()}>Add Contact</button>
        </div>

        {/* <ContactCard firstName={firstName} lastName={lastName} companyName={companyName} numbers={numbers} emails={emails} socialMedia={socialMedia} notes={notes} /> */}

        <NewContactForm handleNewContact={this.addNewContact.bind(this)}/>
      </div>
    )
  }
}
