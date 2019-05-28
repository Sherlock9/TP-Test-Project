import {shallow, mount, render} from 'enzyme';
import ParseRupiah from '../components/ParseRupiah.js';
import React from 'react';

import renderer from 'react-test-renderer';

it('ParseRupiah snapshot', () => {
  let tree = renderer.create(<ParseRupiah />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('ParseRupiah loads', () => {
  let wrapper = mount(<ParseRupiah />);
  expect(wrapper.state()).toEqual({
    inputValue: '',
    denomAmount: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    warningShown: false,
  });
});

describe('Testing for correct inputs', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<ParseRupiah />);
  });

  it('ParseRupiah parses input on submit', () => {
    let mockedChange = {target: {value: 'Rp 289.875'}};
    wrapper.find('input').simulate('change', mockedChange);
    wrapper.find('button').simulate('click');
    expect(wrapper.state()).toEqual({
      inputValue: 'Rp 289.875',
      denomAmount: [2, 1, 1, 1, 1, 4, 1, 1, 1, 1, 25],
      warningShown: false,
    });
  });

  it('Correct case without "Rp "', () => {
    let mockedChange = {target: {value: '18.215'}};
    wrapper.find('input').simulate('change', mockedChange);
    wrapper.find('button').simulate('click');
    expect(wrapper.state()).toEqual({
      inputValue: '18.215',
      denomAmount: [0, 0, 0, 1, 1, 3, 0, 1, 0, 0, 15],
      warningShown: false,
    });
  });

  it('Correct case with "Rp "', () => {
    let mockedChange = {target: {value: 'Rp 120.325'}};
    wrapper.find('input').simulate('change', mockedChange);
    wrapper.find('button').simulate('click');
    expect(wrapper.state()).toEqual({
      inputValue: 'Rp 120.325',
      denomAmount: [1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 25],
      warningShown: false,
    });
  });

  it('17500: Correct, incorrect, correct', () => {
    let mock1 = {target: {value: 'Rp17500'}};
    let mock2 = {target: {value: '17,500'}};
    let mock3 = {target: {value: 'Rp17.500,00'}};
    wrapper.find('input').simulate('change', mock1);
    wrapper.find('button').simulate('click');
    expect(wrapper.state()).toEqual({
      inputValue: 'Rp17500',
      denomAmount: [0, 0, 0, 1, 1, 2, 1, 0, 0, 0, 0],
      warningShown: false,
    });
    wrapper.find('input').simulate('change', mock2);
    wrapper.find('button').simulate('click');
    expect(wrapper.state()).toEqual({
      inputValue: '17,500',
      denomAmount: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      warningShown: true,
    });
    wrapper.find('input').simulate('change', mock3);
    wrapper.find('button').simulate('click');
    expect(wrapper.state()).toEqual({
      inputValue: 'Rp17.500,00',
      denomAmount: [0, 0, 0, 1, 1, 2, 1, 0, 0, 0, 0],
      warningShown: false,
    });
  });

  it('Should handle extra zeros', () => {
    let mock1 = {target: {value: '005.000'}};
    let mock2 = {target: {value: '001000'}};
    wrapper.find('input').simulate('change', mock1);
    wrapper.find('button').simulate('click');
    expect(wrapper.state()).toEqual({
      inputValue: '005.000',
      denomAmount: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      warningShown: false,
    });
    wrapper.find('input').simulate('change', mock2);
    wrapper.find('button').simulate('click');
    expect(wrapper.state()).toEqual({
      inputValue: '001000',
      denomAmount: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      warningShown: false,
    });
  });

  it('Should handle invalid separators', () => {
    let mockedChange = {target: {value: '2 500'}};
    wrapper.find('input').simulate('change', mockedChange);
    wrapper.find('button').simulate('click');
    expect(wrapper.state()).toEqual({
      inputValue: '2 500',
      denomAmount: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      warningShown: true,
    });
  });

  it('Should handle valid characters in invalid positions', () => {
    let mockedChange = {target: {value: '3000 Rp'}};
    wrapper.find('input').simulate('change', mockedChange);
    wrapper.find('button').simulate('click');
    expect(wrapper.state()).toEqual({
      inputValue: '3000 Rp',
      denomAmount: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      warningShown: true,
    });
  });

  it('Should handle missing values', () => {
    let mockedChange = {target: {value: 'Rp'}};
    wrapper.find('input').simulate('change', mockedChange);
    wrapper.find('button').simulate('click');
    expect(wrapper.state()).toEqual({
      inputValue: 'Rp',
      denomAmount: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      warningShown: true,
    });
  });
});
