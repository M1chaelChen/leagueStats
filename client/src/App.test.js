import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import App from './App';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const tree = shallow(<App />);
  expect(toJson(tree)).toMatchSnapshot();
});
