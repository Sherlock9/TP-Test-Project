import {shallow, mount, render} from 'enzyme';
import ParseRupiah from '../components/ParseRupiah.js';
import React from 'react';

import renderer from 'react-test-renderer';

it('ParseRupiah parses input on submit', () => {
  let wrapper = mount(<ParseRupiah />);
  let mockedEvent = {target: {value: '18.125'}};
  wrapper.find('input').simulate('change', mockedEvent);
  expect(wrapper.state().inputValue).toEqual('18.125');
});
