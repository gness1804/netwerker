import React, { Component } from 'react';

export default class FollowupButton extends Component {
  constructor() {
    super();
    this.state = {

    };
  } //end of constructor

  render() {
    return(
      <button className="followup-button" onClick={this.props.handleClick}>Flag for Followup</button>
    );
  }

} //end of FollowupButton
