import React, { Component } from 'react'
import firebase, { contactsFromDatabase, signIn, signOut } from '../firebase';
import {split, pick, map, extend } from 'lodash';
import moment from 'moment';


export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      contacts: []
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }


// export const contactsFromDatabase = firebase.database().ref('messages');

  render() {
    const { user } = this.state;
    return(
      <div className = 'application'>

        <div className='active-user'>{user ?
          <p>Logged in as <span className="bold">{user.displayName}</span> ({user.email})  <button className='auth-button button' onClick={()=> signOut()}>Sign Out</button>
          </p>
        : <button className='auth-button' onClick={() => signIn()}>Sign In</button> }
        </div>

      </div>
    )
  }
}
