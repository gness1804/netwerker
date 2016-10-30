import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { assert,expect } from 'chai';

import Application from '../lib/components/Application';
import NewContactForm from '../lib/components/NewContactForm';

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
}); //end of describe NewContactForm
