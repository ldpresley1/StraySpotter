import React from 'react';
import { Text, View, StyleSheet, Image, Dimensions, Appearance, Pressable } from 'react-native';
import { Icon } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import { darkTheme, lightTheme } from './Themes';

const theme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class MapListView extends React.Component {

	render() {
		const mapRegion = {
			latitude: 33.2083,
			longitude: -87.5504,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		};
		return (
			<MapView
				style={{ alignSelf: 'stretch', height: '100%' }}
				region={mapRegion}
				showsUserLocation = {true} >

				{
				this.props.strayList.map( (data, index) => {
					// console.log(index, data);
					// console.log(index, data.cord);
					return (
						<Marker
							coordinate={{latitude:data.cord.lat, longitude:data.cord.long}}
							title={data.title}
							description={data.description}
							key={data.id} >

							<Image source={{uri:data.images[0]}} style={styles.pinThumbnail} />
						</Marker>
					);
				})
				}
			</MapView>
		);
	}
}

const styles = StyleSheet.create({
	pinThumbnail: {
	  height: 40,
	  width:40,
	  borderRadius: 40/2
	},
});