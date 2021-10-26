import React,{useState, Component } from 'react';
import {navigation, Pressable, Text, View, StyleSheet, Appearance} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { darkTheme, lightTheme } from './Themes';
const theme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme

const CustomGeolocation = (props) => {
	const [mapRegion, setMapRegion] = useState({
		latitude: 33.2083,
		longitude: -87.5504,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});

	const [markerData, setMarkerData] = useState({
		latitude: 33.2083,
		longitude: -87.5504
	});
    var locationButtonText = "Select Location";

	return (
		<View style={styles.window}>
			<MapView
				style={{ alignSelf: 'stretch', height: '100%' }}
				region={mapRegion}

				// if you don't do this, the placing of the marker will
				// re-render everything and change the region back to original
				onRegionChangeComplete={(region) => {setMapRegion(region)}}
				showsUserLocation = {true}
				// super buggy if rotate is on
				rotateEnabled={false}
				onPress={(e) => {setMarkerData(e.nativeEvent.coordinate)}} >

				<Marker
					coordinate={{latitude: markerData.latitude, longitude: markerData.longitude}}
					draggable
					onDragEnd={(e) => {setMarkerData(e.nativeEvent.coordinate)}}
				>
				</Marker>
			</MapView>
			<Pressable style={styles.mapButton} onPress={() => {
					props.navigation.navigate('PostPage', markerData);
					locationButtonText = "Location Saved!";
				}}>
				{/* there is no cancel */}
				<Text style={styles.buttonText}>Save Location</Text>
			</Pressable>
		</View>
	);
}
export default CustomGeolocation;

const styles = StyleSheet.create({
	window: {
		width: '100%',
		flex: 6,
		alignItems: 'center',
		justifyContent: 'center'
	},
    mapButton: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius:2,
        backgroundColor:theme.colors.primary,
        position:'absolute',
        marginLeft: 125,
        bottom: 20,
    },
    buttonText:{
        fontSize: 15,
        color:theme.colors.foreground,
    },
});