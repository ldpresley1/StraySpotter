import React from 'react';
import renderer from 'react-test-renderer';

import TimeLine from './TimeLine';

it('renders correctly', async () => {
  const tree = renderer.create(<TimeLine />).toJSON();
  expect(tree).toMatchSnapshot();
});
