import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import { Text, View, Appearance, StyleSheet, Pressable, SafeAreaView, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView, { Marker } from 'react-native-maps';

import { darkTheme, lightTheme } from './Themes';
import TimeLine from './TimeLine';

const theme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme

// class Profile extends React.Component {
const Profile = ({navigation, route}) => {
	const [viewType, setView] = useState("listView");
	const [username, setUsername] = useState("username");
	const [markerData,setMarkerData] = useState({
		latitude: 33.2083,
		longitude: -87.5504
	});

	if (route.params?.latitude) {
		// what it does: check if something has changed, update the state
		// why: if we always update the state, it will make an infinite loop
		if (route.params.latitude != markerData.latitude || route.params.longitude != markerData.longitude) {
			setMarkerData({
				latitude: route.params.latitude,
				longitude: route.params.longitude
			});
		}
	}
	if (route.params?.username && route.params.username != username) {
		setUsername(route.params.username);
	}

	return (
		<View style={styles.window}>
			<View style={styles.usernameView}>
				<Text style={[styles.basicText,{marginRight:20}]}>{username}</Text>
				<Pressable style={styles.button} onPress={() => navigation.navigate('Settings',{parent:'PersonalProfile'})}>
					<Icon style={styles.iconStyle} name='spinner-cog' type='fontisto' color={theme.colors.foreground}/>
					{/* <Icon style={styles.iconStyle} name='player-settings' type='fontisto' color={theme.colors.foreground}/> */}
				</Pressable>
			</View>
			<View style={styles.viewChangerView}>
				<Pressable style={viewType == "mapView" ? styles.viewButtonActive : styles.viewButton} onPress={() => setView("mapView")}>
					<Text style={styles.basicText}>Map View</Text>
				</Pressable>
				<Pressable style={viewType == "listView" ? styles.viewButtonActive : styles.viewButton} onPress={() => setView("listView")}>
					<Text style={styles.basicText}>List View</Text>
				</Pressable>
			</View>
			<TimeLine view={viewType}/>
		</View>
	);
}

const Settings = ({navigation, route}) => {
	const [username, setUsername] = useState('');

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
			<View style={styles.window}>
				<Text style={styles.basicText}>Settings</Text>
				<SafeAreaView>
					<TextInput
						style={styles.input}
						onChangeText={setUsername}
						value={username}
					/>
				</SafeAreaView>
				<Pressable style={styles.button} onPress={() => navigation.navigate(route.params.parent,{username:username.trim()})}>
					<Text style={styles.basicText}>Go Back</Text>
				</Pressable>
			</View>
		</TouchableWithoutFeedback>
	);
}

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
					props.navigation.navigate('PersonalProfile', markerData);
				}}>
				{/* there is no cancel */}
				<Text style={styles.basicText}>Save Location</Text>
			</Pressable>
		</View>
	);
}

const Stack = createNativeStackNavigator();

function App() {
	return (
		<Stack.Navigator screenOptions={{headerShown:false}}>
			<Stack.Screen name="PersonalProfile" component={Profile} />
			<Stack.Screen name="Settings" component={Settings} />
		</Stack.Navigator>
	);
}


export default App;

const styles = StyleSheet.create({
	window: {
		width: '100%',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: theme.colors.background,
	},
	basicText: {
		color:theme.colors.foreground,
	},
	button: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius:2,
		backgroundColor:theme.colors.primary,
		marginVertical: 30,
	},
	usernameView: {
		flexDirection:'row',
		justifyContent:"space-between",
		alignItems:'center'
	},
	viewChangerView: {
		// flex:1,
		flexDirection:'row',
		justifyContent:"space-between",
		alignItems:'center'
	},
	viewButton: {
		flex:1,
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor:theme.colors.primary,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		borderBottomWidth:1,
		borderBottomColor:theme.colors.primary,
	},
	viewButtonActive: {
		flex:1,
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor:theme.colors.primary,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		borderBottomWidth:1,
		borderBottomColor:theme.colors.foreground,
	},
	mapButton: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius:2,
		backgroundColor:theme.colors.primary,
		position:'absolute',
		bottom: 10,
	},
	iconStyle: {
		// flex:1
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	}
});

