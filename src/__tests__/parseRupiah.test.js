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
    denomAmount: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    warningShown: false,
  });
});

describe('Testing for correct inputs', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<ParseRupiah />);
  });

  it('ParseRupiah parses input on submit', () => {
    let input = wrapper.find('input');
    let mockedChange = {target: {value: 'Rp 289.875'}};
    input.simulate('change', mockedChange);
    input.simulate('submit');
    expect(wrapper.state()).toEqual({
      inputValue: 'Rp 289.875',
      denomAmount: ['2', '1', '1', '1', '1', '4', '1', '1', '1', '1', '25'],
      warningShown: false,
    });
  });

  it('Correct case without "Rp "', () => {
    let input = wrapper.find('input');
    let mockedChange = {target: {value: '18.215'}};
    input.simulate('change', mockedChange);
    input.simulate('submit');
    expect(wrapper.state()).toEqual({
      inputValue: '18.215',
      denomAmount: ['0', '0', '0', '1', '1', '3', '0', '1', '0', '0', '15'],
      warningShown: false,
    });
  });

  it('Correct case with "Rp "', () => {
    let input = wrapper.find('input');
    let mockedChange = {target: {value: 'Rp 120.325'}};
    input.simulate('change', mockedChange);
    input.simulate('submit');
    expect(wrapper.state()).toEqual({
      inputValue: 'Rp 120.325',
      denomAmount: ['1', '0', '1', '0', '0', '0', '0', '1', '1', '0', '25'],
      warningShown: false,
    });
  });

  it('17500: Correct, incorrect, correct', () => {
    let input = wrapper.find('input');
    let mock1 = {target: {value: 'Rp17500'}};
    let mock2 = {target: {value: '17,500'}};
    let mock3 = {target: {value: 'Rp17.500,00'}};

    input.simulate('change', mock1);
    input.simulate('submit');
    expect(wrapper.state()).toEqual({
      inputValue: 'Rp17500',
      denomAmount: ['0', '0', '0', '1', '1', '2', '1', '0', '0', '0', '0'],
      warningShown: false,
    });

    input.simulate('change', mock2);
    input.simulate('submit');
    expect(wrapper.state()).toEqual({
      inputValue: '17,500',
      denomAmount: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      warningShown: true,
    });

    input.simulate('change', mock3);
    input.simulate('submit');
    expect(wrapper.state()).toEqual({
      inputValue: 'Rp17.500,00',
      denomAmount: ['0', '0', '0', '1', '1', '2', '1', '0', '0', '0', '0'],
      warningShown: false,
    });
  });

  it('Should handle extra zeros', () => {
    let input = wrapper.find('input');
    let mock1 = {target: {value: '005.000'}};
    let mock2 = {target: {value: '001000'}};

    input.simulate('change', mock1);
    input.simulate('submit');
    expect(wrapper.state()).toEqual({
      inputValue: '005.000',
      denomAmount: ['0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0'],
      warningShown: false,
    });

    input.simulate('change', mock2);
    input.simulate('submit');
    expect(wrapper.state()).toEqual({
      inputValue: '001000',
      denomAmount: ['0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0'],
      warningShown: false,
    });
  });

  it('Should handle invalid separators', () => {
    let input = wrapper.find('input');
    let mockedChange = {target: {value: '2 500'}};
    input.simulate('change', mockedChange);
    input.simulate('submit');
    expect(wrapper.state()).toEqual({
      inputValue: '2 500',
      denomAmount: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      warningShown: true,
    });
  });

  it('Should handle valid characters in invalid positions', () => {
    let input = wrapper.find('input');
    let mockedChange = {target: {value: '3000 Rp'}};
    input.simulate('change', mockedChange);
    input.simulate('submit');
    expect(wrapper.state()).toEqual({
      inputValue: '3000 Rp',
      denomAmount: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      warningShown: true,
    });
  });

  it('Should handle missing values', () => {
    let input = wrapper.find('input');
    let mockedChange = {target: {value: 'Rp'}};
    input.simulate('change', mockedChange);
    input.simulate('submit');
    expect(wrapper.state()).toEqual({
      inputValue: 'Rp',
      denomAmount: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      warningShown: true,
    });
  });

  it('Correctly handles decimals', () => {
    let input = wrapper.find('input');
    let mockedChange = {target: {value: '100000,01'}};
    input.simulate('change', mockedChange);
    input.simulate('submit');
    expect(wrapper.state()).toEqual({
      inputValue: '100000,01',
      denomAmount: ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0,01'],
      warningShown: false,
    });
  });
});
