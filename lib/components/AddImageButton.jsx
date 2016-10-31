import React, { Component } from 'react';
import ContactCard from './ContactCard';

export default class AddImageButton extends Component {
  constructor() {
    super();

  } //end of constructor

  render() {
    return(
      <input className="add-image-button" type="file" onChange={this.props.handleChange} accept="image/*"/>
    );
  }

} //end of AddImageButton
