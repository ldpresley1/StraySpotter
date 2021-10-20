import React, { useState } from 'react';
import { Dimensions, View, StyleSheet, Image, Text, Appearance } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { darkTheme, lightTheme } from './Themes';

const theme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const Map = (props) => {
const imageURL = ''
  const [mapRegion, setmapRegion] = useState({
    latitude: 33.2083,
    longitude: -87.5504,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });


  return (
    <View style={[styles.window, styles.container]}>
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

          <Image source={require('./images/whisper.jpg')} style={{height: 40, width:40, borderRadius: 40/ 2 }}

          />
          </Marker>
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
  window: {
    width: '100%',
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
});
