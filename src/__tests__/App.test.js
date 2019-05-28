import {shallow, mount, render} from 'enzyme';
import App from '../components/App.js';
import React from 'react';

import renderer from 'react-test-renderer';

it('App snapshot', () => {
  let tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
