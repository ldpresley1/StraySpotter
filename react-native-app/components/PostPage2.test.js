import React from 'react';
import renderer from 'react-test-renderer';

import emptyArray from './PostPage';

it('renders correctly', async () => {
  expect(renderer.create(<emptyArray />).toJSON()).toMatchSnapshot();
});
