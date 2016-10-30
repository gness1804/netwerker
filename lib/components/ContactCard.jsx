import React, { Component } from 'react'
import {NewContactForm} from './NewContactForm.jsx'

export default class ContactCard extends Component {
  constructor() {
    super();
  }
  render() {
    const { firstName, lastName, companyName, numbers, emails, socialMedia, notes } = this.props
    return(
      <div className='contactCardContainer'>
        <div className='fullname firstName lastName'>{firstName} {lastName}</div>
        <div className='companyName'>{companyName}</div>
        <div className = 'numbers'>{numbers.cell}---{numbers.home} -- {numbers.work}</div>
        <div className='notes'>{notes}</div>
      </div>

    )
  }
}
