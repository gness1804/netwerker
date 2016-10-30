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

  it("should change state on entry of a more complex data item like cell phone number", ()=>{
    const wrapper = mount(<NewContactForm/>);
    const cellNumberInput = wrapper.find('.cellNumber-Input');
    assert.strictEqual(wrapper.state().numbers.cell, '');
    cellNumberInput.simulate('change', {target: {value: '99999999'}});
    assert.strictEqual(wrapper.state().numbers.cell, '99999999');
  }); //end of


}); //end of describe NewContactForm
