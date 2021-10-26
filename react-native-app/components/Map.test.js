import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import renderer from 'react-test-renderer';

import MapListView from './Map';

it('renders correctly', async () => {
  const tree = renderer.create(<MapListView />).toJSON();
  expect(tree).toMatchSnapshot();
});
