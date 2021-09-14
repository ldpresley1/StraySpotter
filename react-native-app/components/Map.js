import React, { useState } from 'react';
import { Dimensions, View, StyleSheet,Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const Map = () => {
const imageURL = ''
  const [mapRegion, setmapRegion] = useState({
    latitude: 33.2083,
    longitude: -87.5504,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });


  return (
    <View style={styles.container}>
      <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={mapRegion}
        showsUserLocation = {true}
      >
              <Marker
            coordinate={{latitude: 33.2083, longitude: -87.5504}}
            title="this is a marker"
            description="this is a marker example"
          >
          </Marker>
        </MapView>
    </View>
  );
};
export default Map;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height
  },
});
