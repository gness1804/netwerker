import React, { Component } from 'react'
import firebase, { contactsFromDatabase, signIn, signOut } from '../firebase';
import {split, pick, map, extend } from 'lodash';
import moment from 'moment';
import NewContactForm from './NewContactForm.jsx';
import ContactCard from './ContactCard.jsx'
import ContactCardList from './ContactCardList.jsx';


// let contactsFromDatabase;

export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      contacts: [],
      contactDatabase: null,
      contactImgStorage: null,
      showAddForm: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => this.setState({ user, contactDatabase: user ?  firebase.database().ref(user.uid) : null , contactImgStorage: user ? firebase.storage().ref() : null }, ()=>{
    user ?
    firebase.database().ref(user.uid).on('value', (snapshot) => {
      const contacts = snapshot.val() || {};
      this.setState({
        contacts: map(contacts, (val, key) => extend(val, { key }))
        });
      }): this.setState({
        contacts: []
      });
    }
  ));
} //end of componentDidMount

  addNewContact(newContactInfo, image){
    this.state.contactDatabase.push(newContactInfo);
    if(image){
        this.state.contactImgStorage.child(`${this.state.user.uid}/${newContactInfo.contactID}.jpg`).put(image)
    }
    this.setState({showAddForm: false})
  }

  editContact(contactID, newContactInfo, image){
      this.state.contactDatabase.child(`${contactID}`).set(newContactInfo)
      this.state.contactImgStorage.child(`${this.state.user.uid}/${newContactInfo.contactID}.jpg`).put(image);
  }

  toggleFollowup(contactID, followup){
    this.state.contactDatabase.child(`${contactID}`).child('followup').set(followup);
  }


  render() {
    const { user } = this.state;
    console.log(this.state.contacts)
    if(this.state.contactImgStorage){
     console.log(this.state.contactImgStorage.bucket);
   }

    let pageDisplay;

    if(this.state.showAddForm){
      pageDisplay =  <NewContactForm handleNewContact={this.addNewContact.bind(this)} numbers={{}} emails={{}} socialMedia={{}}/>
    } else {
      pageDisplay = <ContactCardList user={this.state.user} imgStorage = {this.state.contactImgStorage} contacts = {this.state.contacts} submitEdit={this.editContact.bind(this)} toggleFollowup={this.toggleFollowup.bind(this)}/>
    }

    return(
      <div className = 'application'>
        <header>
          <h1>Netwerker</h1>
          <div className='active-user'>{user ?
            <p>Logged in as <span className="bold">{user.displayName}</span> ({user.email})  <button className='auth-button button' onClick={()=> signOut()}>Sign Out</button>
            </p>
            : <button className='auth-button' onClick={() => signIn()}>Sign In</button> }
            </div>
        </header>


        <button className='add-contact-button' onClick={()=>this.setState({showAddForm: true})}>Add Contact</button>


        {pageDisplay}

        <button onClick={this.editContact.bind(this)}>Test</button>

      </div>
    )
  }
}
