import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { assert,expect } from 'chai';
require('locus');

import Application from '../lib/components/Application';
import NewContactForm from '../lib/components/NewContactForm';
import ContactCard from '../lib/components/ContactCard';

describe("application", ()=>{
  it("should render as a div", ()=>{
    const wrapper = shallow(<Application/>);
    assert.strictEqual(wrapper.type(), 'div');
  }); //end of render as div
}); //end of describe application

describe("NewContactForm", ()=>{
  it("should change state when user enters info in a field", ()=>{
    const wrapper = mount(<NewContactForm/>);
    const firstNameInput = wrapper.find('.firstName-Input');
    assert.strictEqual(wrapper.state('firstName'), '');
    firstNameInput.simulate('change', {target: {value: 'Hello World'}});
    assert.strictEqual(wrapper.state('firstName'), 'Hello World');
  }); //end of change state when user enters info in a field

  it("should change state on entry of a more complex data item like cell phone number", ()=>{
    const wrapper = mount(<NewContactForm/>);
    const cellNumberInput = wrapper.find('.cellNumber-Input');
    assert.strictEqual(wrapper.state().numbers.cell, '');
    cellNumberInput.simulate('change', {target: {value: '99999999'}});
    assert.strictEqual(wrapper.state().numbers.cell, '99999999');
  });
}); //end of describe NewContactForm

describe("ContactCard", ()=>{
  it("should display contact info when user enters it", ()=>{
    const newContact = {
        firstName: 'John',
        lastName: 'Cleese',
        companyName: 'Monty Python',
        numbers: {
          cell: 44,
          work: 454,
          home: 46
        },
        emails: {
          primary: 'john@schoolofsillywalks.com',
          secondary: 'john@spanishinquisition.org'
        },
        socialMedia: {
          facebook: 'john_cleese_fb',
          twitter: '@johncleese',
          linkedIn: 'jcleese',
          github: 'jcleese',
          instagram: 'j-cleese-photos'
        },
        notes: 'I am the best actor from Monty Python.',
        image: 'http://theprojectheal.org/wp-content/uploads/2016/01/Aaaaaawwwwwwwwww-Sweet-puppies-9415255-1600-1200.jpg?x79550'
    };
    const wrapper = render(<ContactCard {...newContact}/>);
    let company = wrapper.find('.companyName').text();
    assert.strictEqual(company, 'Monty Python');
    let cell = wrapper.find('.cell').text();
    assert.strictEqual(+cell, 44);
    let primEmail = wrapper.find('.primary-email').text();
    assert.strictEqual(primEmail, 'john@schoolofsillywalks.com');
    let github = wrapper.find('.github').text();
    assert.strictEqual(github, 'jcleese');
  }); //end of display contact info when user enters it
}); //end of describe ContactCard
