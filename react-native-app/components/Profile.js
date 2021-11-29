import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import { Text, View, Appearance, StyleSheet, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, Image, Alert, KeyboardAvoidingView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImageBrowserScreen from './ImageBrowserScreen';

import { darkTheme, lightTheme } from './Themes';
import TimeLine from './TimeLine';
import Header from './Header';
import { ScreenWidth } from 'react-native-elements/dist/helpers';

import dbo, { storeData } from './dataStorage';
import LoadingModal from './LoadingModal';
import SecureInput from './SecureInput';

const theme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme

// class Profile extends React.Component {
const Profile = ({navigation, route}) => {
	let username = dbo.firebase.auth().currentUser.displayName ? dbo.firebase.auth().currentUser.displayName : dbo.firebase.auth().currentUser.email;

	const FullLengthButton = (props) => {
		return (
			<Pressable style={styles.fullButton} onPress={props.onTap}>
				<View style={styles.fullButtonIconView}>
					<Icon style={styles.fullButtonIcon} name={props.iconName} type={props.iconType} color={theme.colors.primary}/>
				</View>
				<Text style={styles.fullButtonText}>{props.title}</Text>
				<View style={styles.fullButtonRightIcon}>
					<Icon style={styles.fullButtonIcon} name="angle-right" type="fontisto" color={theme.colors.foreground}/>
				</View>
			</Pressable>
		);
	}

	return (
		<ScrollView style={styles.scrollView}>
			<View style={styles.wrapper}>
				<Image source={
					dbo.firebase.auth().currentUser.photoURL ? 
						{uri: dbo.firebase.auth().currentUser.photoURL} : 
						require('../assets/favicon.png')} 
					style={styles.profilePicture}/>
				<Text style={styles.usernameText}>{username}</Text>

				<View style={styles.line}></View>
				<FullLengthButton onTap={() => navigation.navigate("MyPosts")} iconName='paw' iconType='fontisto' title='My Posts' />
				<FullLengthButton onTap={() => navigation.navigate("Settings")} iconName='spinner-cog' iconType='fontisto' title='Settings' />
				<FullLengthButton onTap={() => navigation.navigate("Privacy")} iconName='lock' iconType="fontistio" title='Privacy' />
				<FullLengthButton onTap={() => navigation.navigate("About")} iconName='info' iconType="fontisto" title='About' />
				<FullLengthButton onTap={() => navigation.navigate("Help")} iconName='coffeescript' iconType="fontisto" title='Help' />
				<FullLengthButton 
					onTap={() => {
						dbo.firebase.auth().signOut().then(() => {
							navigation.replace('LogIn');
						})
					}}
					iconName='arrow-return-left' iconType="fontisto" title='Log Out' />
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
			<TimeLine view={viewType} uid={dbo.firebase.auth().currentUser.uid}/>
		</View>
	);
}

const Privacy = ({navigation, route}) => {
	return (
		<View style={styles.window}>
			<View style={styles.viewChangerView}>
				<Text style={styles.basicTextButLarger}>
				When opening the Stray Spotter app, you agree to allow us to use your device's location in order to show you, as the user, the best data for your location.{"\n"}{"\n"}
				This location is not stored anywhere in our system, and is only used for the time in which you have the app open on your device.
				</Text>
			</View>
		</View>
	);
}

const About = ({navigation, route}) => {
	return (
		<View style={styles.window}>
			<View style={styles.viewChangerView}>
				<Text style={styles.basicTextButLarger}>
				    Stray Spotter is an app to help owners find their lost pets.{"\n"}{"\n"}
				    This app allows users to upload photos of strays they have seen while they are outside and geotag the location in which they were seen.{"\n"}{"\n"}
				    Since the majority of lost animals are found within a few miles of their homes, owners can use the app to check through all of the strays that have been posted within a certain area.{"\n"}{"\n"}
				    With our app, we are hoping to help owners find their lost pets quicker and easier than before.
				</Text>
			</View>
		</View>
	);
}

const Help = ({navigation, route}) => {
	return (
		<View style={styles.window}>
			<View style={styles.viewChangerView}>
				<Text style={styles.basicTextButLarger}>
				There are four pages in the Stray Spotter app.{"\n"}{"\n"}

				<Icon name={'camera'} color={theme.colors.primary} type='fontisto'/> {'   '}
				You can use the uploads page to upload any strays that you find.{"\n"}{"\n"}

				<Icon name={'map'} color={theme.colors.primary} type='fontisto'/> {'   '}
				You can use the map page to navigate around a map to find nearby strays.{"\n"}{"\n"}

				<Icon name={'paw'} color={theme.colors.primary} type='fontisto'/> {'   '}
				You can use the timeline page to view strays near your location.{"\n"}{"\n"}

				<Icon name={'person'} color={theme.colors.primary} type='fontisto'/> {'   '}
				Lastly, you can use the profile page to access more information about the app and to view your own uploads.
				</Text>
			</View>
		</View>
	);
}

const ChangePassword = (props) => {
	const [errorMessage, setErrorMessage] = useState("");
	const [currPassword, setCurrPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false);

	const updatePassword = async (thePassword) => {
		var user = dbo.firebase.auth().currentUser;

		try { const response = await user.updatePassword(thePassword); }
		catch (error) { return error; }
	}

	const reAuth = async () => {
		var user = dbo.firebase.auth().currentUser;
		var cred = dbo.firebase.auth.EmailAuthProvider.credential(user.email, currPassword);
		return user.reauthenticateWithCredential(cred);
	}

	const attemptUpdate = () => {
		setIsModalVisible(true);

		if (newPassword !== confirmPassword) {
			setErrorMessage("Passwords do not match");
			setIsModalVisible(false);
			return;
		}

		reAuth()
			.then(() => {
				updatePassword(newPassword)
					.then((error) => {
						if (error) {
							setErrorMessage(error.message);
							setIsModalVisible(false);
						}
						else {
							storeData("password", newPassword);
							setErrorMessage("");
							setCurrPassword("");
							setNewPassword("");
							setConfirmPassword("");
							setIsModalVisible(false);
							// this was a success, set everything to default and leave
							props.navigation.goBack();
						}
					});
			})
			.catch((error) => {
				setErrorMessage(error.message);
				setIsModalVisible(false);
			});
		
	}

	return (
	<KeyboardAvoidingView behavior='position'>
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={styles.container}>
					<Text style={styles.errorText}>{errorMessage}</Text>
					<SecureInput label="Current Password:" placeholder="password" onChange={setCurrPassword} val={currPassword} />
					<SecureInput label="New Password:" placeholder="password" onChange={setNewPassword} val={newPassword} />
					<SecureInput label="Confirm Password:" placeholder="password" onChange={setConfirmPassword} val={confirmPassword} />

					<Pressable style={styles.updateButton} onPress={ attemptUpdate }>
						<Text style={styles.basicText}>Update Password</Text>
					</Pressable>

				<LoadingModal isVisible={isModalVisible} />
			</View>
		</TouchableWithoutFeedback>
	</KeyboardAvoidingView>
	);
}

// Copied from PostPage
async function uploadImageAsync(filename,uri) {
	const blob = await new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.onload = function () {
			resolve(xhr.response);
		};
		xhr.onerror = function (e) {
			console.log(e);
			reject(new TypeError("Network request failed"));
		};
		xhr.responseType = "blob";
		xhr.open("GET", uri, true);
		xhr.send(null);
	});

	const fileRef = dbo.firebase.storage().ref(filename);
	const result = await fileRef.put(blob);
	const url = await fileRef.getDownloadURL();
	// We're done with the blob, close and release it
	blob.close();

	return url;
}

const Settings = ({navigation, route}) => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	if (route.params?.photos) {
		setIsModalVisible(true);

		uploadImageAsync(dbo.firebase.auth().currentUser.uid + route.params.photos[0].name, route.params.photos[0].uri)
			.then((url) => {
				changePhotoURL(url)
					.then((error) => {
						if (error) Alert.alert(error.message);
						setIsModalVisible(false);
					});
			})
			.catch((error) => {
				Alert.alert(error.message);
				setIsModalVisible(false);
			});


		delete route.params.photos;
	}
	
	const changeEmail = async (newEmail) => {
		var user = dbo.firebase.auth().currentUser;

		try { 
			const response = await user.updateEmail(newEmail);
			storeData("email", newPassword);
		}
		catch (error) { return error; }
	}

	const changeDisplayName = async (displayName) => {
		const update = { displayName: displayName };

		try { const response = await dbo.firebase.auth().currentUser.updateProfile(update); }
		catch (error) { return error; }
	}

	const changePhotoURL = async (url) => {
		const update = { photoURL: url };

		try { const response = await dbo.firebase.auth().currentUser.updateProfile(update); }
		catch (error) { return error; }
	}

	const SettingsInput = (props) => {
		const [textValue, setTextValue] = useState(props.defaultValue);
	
		return (<>
			<Text style={styles.inputLabel}>{props.inputLabel}</Text>
			<View style={styles.textInputView}>
				<TextInput
					style={styles.textInput}
					onChangeText={setTextValue}
					placeholder={props.inputPlaceholder}
					value={textValue}
					autoCapitalize='none'
					autoCorrect={false}
					secureTextEntry={false} />
			</View>
	
			<Pressable style={styles.updateButton} onPress={ () => {
				setIsModalVisible(true);
				props.updateFunction(textValue).then((error) => {
					if (error) Alert.alert(error.message);
					setIsModalVisible(false);
				});
			}}>
				<Text style={styles.basicText}>Update {props.inputLabel}</Text>
			</Pressable>
		</>);
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
			<View style={styles.window}>
				{/* <Text style={styles.basicText}>Settings</Text> */}

				<SettingsInput 
					inputLabel="Display Name"
					inputPlaceholder="Johnny Appleseed"
					defaultValue={dbo.firebase.auth().currentUser.displayName}
					updateFunction={changeDisplayName} />

				<SettingsInput 
					inputLabel="Email"
					inputPlaceholder="johnnyappleseed@example.com"
					defaultValue={dbo.firebase.auth().currentUser.email}
					updateFunction={changeEmail} />

				<Pressable style={styles.updateButton} onPress={ () => navigation.navigate("ProfilePicturePicker",{parent:"Settings",maxImages:1}) }>
					<Text style={styles.basicText}>Change Profile Picture</Text>
				</Pressable>
				<Pressable style={styles.updateButton} onPress={ () => navigation.navigate("ChangePassword") }>
					<Text style={styles.basicText}>Change Password</Text>
				</Pressable>

				<LoadingModal isVisible={isModalVisible} />
			</View>
		</TouchableWithoutFeedback>
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
			<Stack.Screen name="Settings" component={Settings} options={{
				gestureEnabled: false,
				header:({navigation, route, options}) => {
					return <Header navFunc={() => navigation.navigate("PersonalProfile",{needsReload:true}) } />
				},
			}}/>
			<Stack.Screen name="ChangePassword" component={ChangePassword} />
			<Stack.Screen name="ProfilePicturePicker" component={ImageBrowserScreen}
				options={{
					title: 'Selected 0 files',
					header:({navigation, route, options}) => {
						return <Header route={route} options={options} nav={navigation} />
					},
				}} />
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
	container: {
		width:'100%',
		height:'100%',
		alignItems:'center',
		justifyContent:'center',
		backgroundColor: theme.colors.background,
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
	basicTextButLarger: {
		color:theme.colors.foreground,
		fontSize:20,
		marginHorizontal:theme.spacing.xl,
	},
	profilePicture: {
		alignSelf:'center',
		overflow:'hidden',
		borderRadius:ScreenWidth,
		width:ScreenWidth/2,
		height:ScreenWidth/2,
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
		marginVertical:theme.spacing.m,
		fontSize:36,
		alignSelf:'center',
	},
	line: {
		width:'100%',
		height:0,
		borderBottomColor:theme.colors.foreground,
		borderBottomWidth:1
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
	inputLabel: {
		color:theme.colors.foreground,
		fontWeight:'bold',
		fontSize:24,
		alignSelf:'flex-start',
		
		marginLeft:theme.spacing.l,
		marginTop:theme.spacing.s,
	},
	textInputView: {
		width:'100%',
		alignItems:'center',
	},
	textInput: {
		width:'90%',
		borderRadius:10,
		borderColor:theme.colors.foreground,
		color:theme.colors.foreground,
		borderWidth:1,
		paddingVertical:theme.spacing.l,
		paddingLeft: theme.spacing.l,
	},
	updateButton: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius:2,
		backgroundColor:theme.colors.primary,
		marginTop:theme.spacing.s,
	},
	errorText: {
		color:theme.colors.failure,
		marginVertical:theme.spacing.l,
		marginLeft:'auto',
		marginRight:'auto',
		fontWeight:'bold',
	}
});

