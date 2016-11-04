import React, { Component } from 'react';
import InputField from './InputField.jsx';

export default class NewContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactID: this.props.contactID || Date.now(),
      firstName: this.props.firstName || '',
      lastName: this.props.lastName || '',
      companyName: this.props.companyName || '',
      title: this.props.title || '',
      website: this.props.website || '',
      numbers: {
        cell: this.props.numbers.cell || '',
        work: this.props.numbers.work || '',
        home: this.props.numbers.home || '',
      },
      emails: {
        primary: this.props.emails.primary || '',
        secondary: this.props.emails.secondary || '',
      },
      socialMedia: {
        facebook: this.props.socialMedia.facebook || '',
        twitter: this.props.socialMedia.twitter || '',
        linkedIn: this.props.socialMedia.linkedIn || '',
        github: this.props.socialMedia.github || '',
        instagram: this.props.socialMedia.instagram || '',
      },
      notes: this.props.notes || '',
      image: this.props.image || '',
      followup: this.props.followup || false,
      reader: this.props.fileReaderTest || new FileReader(),
      groups: this.props.groups || [],

    };
    this.handleChange = this.handleChange();
    this.handleSubmit = this.handleSubmit();
  }

  componentDidMount = () => {
    if (this.state.reader !== 'test') {
      this.state.reader.addEventListener('load', () => {
        this.setState({ imgSource: this.state.reader.result });
      }); }
  }

  addContactToGroup = () => {
    const existingGroupMemberships = this.state.groups;
    // get access to array of all groups
    existingGroupMemberships.push('Test Group');
  }

  addImage = (e) => {
    const image = e.target.files[0];
    this.setState({ image },
        this.state.reader.readAsDataURL(image)
    );
  }

  toggleFollowup = () => {
    this.setState({ followup: !this.state.followup });
  }// end of toggleFollowup

  updateState = (e, keyName) => {
    this.setState({ [keyName]: e.target.value });
  }

  updateStateObject = (e, keyName, objName) => {
    const objState = this.state[objName];
    objState[keyName] = e.target.value;
    this.setState({ [objName]: objState });
  }

  handleChange = (event) => {
    this.setState({ numbers: event.target.value });
  }

  handleSubmit = () => {
    alert(`Select value is: ${this.state.numbers}`);
  }

  submitNewContact = () => {
    const newContact = {
      contactID: this.state.contactID,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      companyName: this.state.companyName,
      title: this.state.title,
      website: this.state.website,
      numbers: {
        cell: this.state.numbers.cell,
        work: this.state.numbers.work,
        home: this.state.numbers.home,
      },
      emails: {
        primary: this.state.emails.primary,
        secondary: this.state.emails.secondary,
      },
      socialMedia: {
        facebook: this.state.socialMedia.facebook,
        twitter: this.state.socialMedia.twitter,
        linkedIn: this.state.socialMedia.linkedIn,
        github: this.state.socialMedia.github,
        instagram: this.state.socialMedia.instagram,
      },
      notes: this.state.notes,
      followup: this.state.followup,
      groups: this.state.groups,
    };
    const image = this.state.image;
    this.props.handleNewContact(newContact, image);
  }

  render = () => {
    const {
      // firstName,
      // lastName,
      // companyName,
      // numbers,
      // emails,
      // socialMedia,
      // notes,
      // image,
      // title,
      // website,
      followup,
      groups } = this.state;

    // let imgSource;
    let imageDisplay;

    if (this.state.imgSource) {
      imageDisplay = (<img
        src = {this.state.imgSource}
        alt = "The pic assigned to the contact."
      />);
    }

    return (
      <div className = "input-field-container">
        <InputField
          className = "firstName-Input input-field"
          value = {this.state.firstName}
          placeholder = "First Name"
          type = "text"
          handleChange = {this.updateState()}
          name = "firstName"
        />
        <InputField
          className = "lastName-Input input-field"
          value = {this.state.lastName}
          placeholder = "Last Name"
          type = "text"
          handleChange = {this.updateState()}
          name = "lastName"
        />
        <InputField
          className = "companyName-Input input-field"
          value = {this.state.companyName}
          placeholder = "Company Name"
          type = "text"
          handleChange = {this.updateState()}
          name = "companyName"
        />
        <InputField
          className = "title-Input input-field"
          value = {this.state.title}
          placeholder = "Title"
          type = "text"
          handleChange = {this.updateState()}
          name = "title"
        />
        <InputField
          className = "website-Input input-field"
          value = {this.state.website}
          placeholder = "Company Website"
          type = "text"
          handleChange = {this.updateState()}
          name = "website"
        />
        {/* <div>
        <select value={this.state.numbers} onChange={this.handleChange}>
          <option value="cell">Cell</option>
          <option value="work">Work</option>
          <option value="home">Home</option>
        </select>
        <InputField className='phoneNumber-Input'
        value = {this.state.numbers} placeholder = 'Phone Number'
        type = "text" handleChange={this.updateStateObject()}
        objName = 'numbers'/>
      </div> */}
        <InputField
          className = "cellNumber-Input input-field"
          value = {this.state.numbers.cell}
          placeholder = "cell Number"
          type = "text"
          handleChange = {this.updateStateObject()}
          objName = "numbers"
          name = "cell"
        />
        <InputField
          className = "workNumber-Input input-field"
          value = {this.state.numbers.work}
          placeholder = "work Number"
          type = "text"
          handleChange = {this.updateStateObject()}
          objName = "numbers"
          name = "work"
        />
        <InputField
          className = "homeNumber-Input input-field"
          value = {this.state.numbers.home}
          placeholder = "home Number"
          type = "text"
          handleChange = {this.updateStateObject()}
          objName = "numbers"
          name = "home"
        />
        <InputField
          className = "primaryEmail-Input input-field"
          value = {this.state.emails.primary}
          placeholder = "Primary Email"
          type = "text"
          handleChange = {this.updateStateObject()}
          objName = "emails"
          name = "primary"
        />
        <InputField
          className = "secondaryEmail-Input input-field"
          value = {this.state.emails.secondary}
          placeholder = "Secondary Email"
          type = "text"
          handleChange = {this.updateStateObject()}
          objName = "emails"
          name = "secondary"
        />
        <InputField
          className = "facebook-Input input-field"
          value = {this.state.socialMedia.facebook}
          placeholder = "facebook"
          type = "text"
          handleChange={this.updateStateObject()}
          objName = "socialMedia"
          name = "facebook"
        />
        <InputField
          className="twitter-Input input-field"
          value = {this.state.socialMedia.twitter}
          placeholder = "twitter"
          type = "text"
          handleChange={this.updateStateObject()}
          objName = "socialMedia"
          name = "twitter"
        />
        <InputField
          className = "linkedIn-Input input-field"
          value = {this.state.socialMedia.linkedIn}
          placeholder = "linkedIn"
          type = "text"
          handleChange={this.updateStateObject()}
          objName = "socialMedia"
          name = "linkedIn"
        />
        <InputField
          className = "github-Input input-field"
          value = {this.state.socialMedia.github}
          placeholder = "github"
          type = "text"
          handleChange={this.updateStateObject()}
          objName = "socialMedia"
          name = "github"
        />
        <InputField
          className = "instagram-Input input-field"
          value = {this.state.socialMedia.instagram}
          placeholder = "instagram"
          type = "text"
          handleChange={this.updateStateObject()}
          objName = "socialMedia"
          name = "instagram"
        />
        <InputField
          className = "notes-input input-field"
          value = {this.state.notes}
          placeholder = "Notes"
          type = "text"
          handleChange={this.updateState()}
          name = "notes"
        />

        {/* <AddImageButton
          className = 'add-image-button'
          handleChange={(e)=>{this.addImage(e)}}/> */}
        {followup ? <img
          src="../images/yellow-flag-2.svg" alt="Yellow flag."
          className="flagged-for-followup-button"
          onClick={() => this.toggleFollowup()}
        /> :
          <img
            src="../images/gray-flag.svg"
            alt=""
            className="not-flagged-for-followup-button"
            onClick={() => this.toggleFollowup()}
          />}

        <label htmlFor="add-image-button" className = "add-image-wrapper">
          <img src="../images/user-ph.jpg" alt="The user." />
          <input
            className="add-image-button"
            type="file"
            onChange={(e) => { this.addImage(e); }}
            accept="image/*"
          />
        </label>

        {/* <p className = "add-image-label input-field">Upload Image</p> */}

        {imageDisplay}
        {groups.length > 0 ? groups : <p>No groups listed for this contact.</p>}
        <button onClick={() => { this.addContactToGroup(); }}>Add to Group</button>

        <button
          className = "submit-new-contact-btn"
          onClick={this.submitNewContact()}
        > Submit New Contact
        </button>


      </div>
    );
  }

}
