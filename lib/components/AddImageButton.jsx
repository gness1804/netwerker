import React, { Component } from 'react';
import ContactCard from './ContactCard';

export default class AddImageButton extends Component {
  constructor() {
    super();
    
  } //end of constructor

  render() {
    return(
      <button onClick={this.props.handleClick}>Add Image</button>
    );
  }

} //end of AddImageButton
