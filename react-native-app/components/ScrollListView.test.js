import React from 'react';
import renderer from 'react-test-renderer';

import Post from './ScrollListView';

it('renders correctly', async () => {
  expect(renderer.create(<Post />).toJSON()).toMatchSnapshot();
});
