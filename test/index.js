import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { assert,expect } from 'chai';

import Application from '../lib/components/Application';

describe("application", ()=>{
  it("should render as a div", ()=>{
    const wrapper = shallow(<Application/>);
    assert.strictEqual(wrapper.type(), 'div');
  }); //end of render as div
}); //end of describe application
