import React, { useState } from 'react';
import { Dimensions, View, StyleSheet, Image, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

this.state = {
  markers: [{
    title: 'hello',
    coordinates: {
      latitude: 3.148561,
      longitude: 101.652778
    },
  },
  {
    title: 'hello',
    coordinates: {
      latitude: 3.149771,
      longitude: 101.655449
    },
  }]
}

const Map = (props) => {
const imageURL = ''
  const [mapRegion, setmapRegion] = useState({
    latitude: 33.2083,
    longitude: -87.5504,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });


  return (
    <View style={[props.windowStyle, styles.container]}>
      <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={mapRegion}
        showsUserLocation = {true}
          >
        {this.state.markers.map(marker => (
          <MapView.Marker
            coordinate={marker.coordinates}
            title={marker.title}
          />
        ))}
        </MapView>
    </View>
  );
};
export default Map;
const styles = StyleSheet.create({
  container: {
    width,
    height
  },
});
