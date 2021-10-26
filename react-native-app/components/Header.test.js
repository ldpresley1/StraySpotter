import React from 'react';
import renderer from 'react-test-renderer';

import Header from './Header';

it('renders correctly', async () => {
  expect(renderer.create(<Header />).toJSON()).toMatchSnapshot();
});
