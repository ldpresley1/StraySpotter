import React from 'react';
import renderer from 'react-test-renderer';

import submitFunction from './PostPage';
import CustomGeolocation from './PostPage';

it('renders correctly', async () => {
  expect(renderer.create(<submitFunction />).toJSON()).toMatchSnapshot();
});
