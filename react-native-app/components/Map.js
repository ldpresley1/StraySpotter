import React, { useState } from 'react';
import { Dimensions, View, StyleSheet,Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
const App = () => {
const imageURL = ''
  const [mapRegion, setmapRegion] = useState({
    latitude: 33.2083,
    longitude: -87.5504,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height
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
        />
        </MapView>
    </View>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {

    flex: 1,
    width,
    height
  },
});
