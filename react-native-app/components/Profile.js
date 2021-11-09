import React, { useState } from 'react';
import { Icon, ThemeContext } from 'react-native-elements';
import { Text, View, Appearance, StyleSheet, Pressable, SafeAreaView, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView, { Marker } from 'react-native-maps';

import { darkTheme, lightTheme } from './Themes';
import TimeLine from './TimeLine';
import Header from './Header';
import { ScreenWidth } from 'react-native-elements/dist/helpers';

import dbo from './dataStorage';

const theme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme

// class Profile extends React.Component {
const Profile = ({navigation, route}) => {
	let username = dbo.firebase.auth().currentUser.displayName ? dbo.firebase.auth().currentUser.displayName : dbo.firebase.auth().currentUser.email;

	return (
		<ScrollView style={styles.scrollView}>
			<View style={styles.wrapper}>
				<Image source={require('../assets/favicon.png')} style={styles.profilePicture}/>
				<Text style={styles.usernameText}>{username}</Text>
				<Pressable style={styles.settingsButton} onPress={() => navigation.navigate('Settings',{parent:'PersonalProfile'})}>
					<Text style={styles.settingsButtonText}>Edit Profile</Text>
					<Icon style={styles.iconStyle} name='eraser' type='fontisto' color={theme.colors.foreground}/>
					{/* <Icon style={styles.iconStyle} name='player-settings' type='fontisto' color={theme.colors.foreground}/> */}
				</Pressable>

				<Pressable style={[styles.fullButton,{borderTopWidth:1}]} onPress={() => navigation.navigate('MyPosts')}>
					<View style={styles.fullButtonIconView}>
						<Icon style={styles.fullButtonIcon} name='paw' type="fontisto" color={theme.colors.primary}/>
					</View>
					<Text style={styles.fullButtonText}>My Posts</Text>
					<View style={styles.fullButtonRightIcon}>
						<Icon style={styles.fullButtonIcon} name="angle-right" type="fontisto" color={theme.colors.foreground}/>
					</View>
				</Pressable>
				<Pressable style={styles.fullButton} onPress={() => navigation.navigate('Privacy')}>
					<View style={styles.fullButtonIconView}>
						<Icon style={styles.fullButtonIcon} name="lock" type="fontistio" color={theme.colors.primary}/>
					</View>
					<Text style={styles.fullButtonText}>Privacy</Text>
					<View style={styles.fullButtonRightIcon}>
						<Icon style={styles.fullButtonIcon} name="angle-right" type="fontisto" color={theme.colors.foreground}/>
					</View>
				</Pressable>
				<Pressable style={styles.fullButton} onPress={() => navigation.navigate('About')}>
					<View style={styles.fullButtonIconView}>
						<Icon style={styles.fullButtonIcon} name="info" type="fontisto" color={theme.colors.primary}/>
					</View>
					<Text style={styles.fullButtonText}>About</Text>
					<View style={styles.fullButtonRightIcon}>
						<Icon style={styles.fullButtonIcon} name="angle-right" type="fontisto" color={theme.colors.foreground}/>
					</View>
				</Pressable>
				<Pressable style={styles.fullButton} onPress={() => navigation.navigate('Help')}>
					<View style={styles.fullButtonIconView}>
						<Icon style={styles.fullButtonIcon} name="coffeescript" type="fontisto" color={theme.colors.primary}/>
					</View>
					<Text style={styles.fullButtonText}>Help</Text>
					<View style={styles.fullButtonRightIcon}>
						<Icon style={styles.fullButtonIcon} name="angle-right" type="fontisto" color={theme.colors.foreground}/>
					</View>
				</Pressable>
				<Pressable style={styles.fullButton} onPress={() => {
						console.log(dbo.firebase.auth().currentUser?.uid);
						dbo.firebase.auth().signOut().then(() => {
							navigation.replace('LogIn');
						})
						// .catch(error => this.setState({ errorMessage: error.message }))
					}}>
					<View style={styles.fullButtonIconView}>
						<Icon style={styles.fullButtonIcon} name="arrow-return-left" type="fontisto" color={theme.colors.primary}/>
					</View>
					<Text style={styles.fullButtonText}>Log Out</Text>
					<View style={styles.fullButtonRightIcon}>
						<Icon style={styles.fullButtonIcon} name="angle-right" type="fontisto" color={theme.colors.foreground}/>
					</View>
				</Pressable>
			</View>
		</ScrollView>
	);
}


const MyPosts = ({navigation, route}) => {
	const [viewType, setView] = useState("listView");
	return (
		<View style={styles.window}>
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

const Privacy = ({navigation, route}) => {
	return (
		<View style={styles.window}>
			<View style={styles.viewChangerView}>
				<Text style={styles.basicText}>This is private. Don't look</Text>
			</View>
		</View>
	);
}

const About = ({navigation, route}) => {
	return (
		<View style={styles.window}>
			<View style={styles.viewChangerView}>
				<Text style={styles.basicText}>This is the about page. It's about here</Text>
			</View>
		</View>
	);
}

const Help = ({navigation, route}) => {
	return (
		<View style={styles.window}>
			<View style={styles.viewChangerView}>
				<Text style={styles.basicText}> Oh thank gosh, are you here to help me? </Text>
			</View>
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
					{/* This must be replaced by updating some async storage component */}
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
		<Stack.Navigator 
			screenOptions={({ route }) => ({
				// for adding custom header, check docs here https://reactnavigation.org/docs/bottom-tab-navigator/#header-related-options
				// lets us set a custom header
				header: ({navigation, route, options}) => {
					return <Header nav={navigation} />
				},
				// removes header
				// headerShown:false,
				showLabel: false,
			})}
			>
			<Stack.Screen name="PersonalProfile" component={Profile} options={{headerShown:false}} />
			<Stack.Screen name="Settings" component={Settings} />
			<Stack.Screen name="MyPosts" component={MyPosts} />
			<Stack.Screen name="Privacy" component={Privacy} />
			<Stack.Screen name="About" component={About} />
			<Stack.Screen name="Help" component={Help} />
		</Stack.Navigator>
	);
}


export default App;

const styles = StyleSheet.create({
	scrollView: {
		backgroundColor:theme.colors.background,
	},
	wrapper: {
		marginTop:theme.spacing.xl,
	},
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
	profilePicture: {
		alignSelf:'center',
		overflow:'hidden',
		borderRadius:ScreenWidth
	},
	settingsButton: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius:2,
		backgroundColor:theme.colors.primary,
		marginVertical: 30,
		
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center'
	},
	settingsButtonText: {
		color:theme.colors.foreground,
		marginHorizontal:20,
		fontSize:36,
		alignSelf:'center',
	},
	usernameView: {
		flexDirection:'row',
		justifyContent:"space-between",
		alignItems:'center'
	},
	usernameText: {
		color:theme.colors.foreground,
		marginLeft:20, 
		fontSize:36, 
		alignSelf:'center',
	},
	fullButton: {
		// flex:1,
		// height:20,
		paddingVertical:10,
		width:'100%',
		flexDirection:'row',
		borderColor:theme.colors.foreground,
		borderBottomWidth:1,
	},
	fullButtonIconView: {
		width:theme.spacing.xl*2,
		// height:50,
		alignItems:'center',
		justifyContent:'center',
	},
	fullButtonIcon: {
		// paddingHorizontal:theme.spacing.l,
	},
	fullButtonText: {
		color:theme.colors.foreground,
		fontSize:28,
	},
	fullButtonRightIcon: {
		marginLeft:'auto',
		marginRight:theme.spacing.m,
	},
	backButton: {
		backgroundColor:theme.colors.background,
		paddingVertical:10,
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

