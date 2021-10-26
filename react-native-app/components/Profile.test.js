import React from 'react';
import renderer from 'react-test-renderer';

import Settings from './Profile';

it('renders correctly', async () => {
  expect(renderer.create(<Settings />).toJSON()).toMatchSnapshot();
});
