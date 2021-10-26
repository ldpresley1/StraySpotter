import React from 'react';
import renderer from 'react-test-renderer';

import Map from '../App'

import componentDidMount from './TimeLine';

it('renders correctly', async () => {
  const tree = renderer.create(<componentDidMount />).toJSON();
  expect(tree).toMatchSnapshot();
});
