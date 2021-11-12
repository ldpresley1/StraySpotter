import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Appearance, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from 'react-native-elements';

import Header from './components/Header';
import Profile from './components/Profile';
import TimeLine from './components/TimeLine';
import PostPage from './components/PostPage';
import { darkTheme, lightTheme } from './components/Themes';
import dbo from './components/dataStorage';
import LoadingModal from './components/LoadingModal';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const theme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme;

export default function AppWithLogin() {
	return (
		<NavigationContainer>
			<Stack.Navigator 
				screenOptions={({ route }) => ({
					// for adding custom header, check docs here https://reactnavigation.org/docs/bottom-tab-navigator/#header-related-options
					// lets us set a custom header
					headerShown:false,
					// removes header
					// headerShown:false,
					showLabel: false,
					gestureEnabled: false
				})}
				>
				<Stack.Screen name="LogIn" component={LogIn} />
				<Stack.Screen name="Signup" component={SignUpScreen} />
				<Stack.Screen name="Dash" component={App} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const LogIn = ({navigation, route}) => {
	const [isModalVisible, setModalVisible] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const logInFunc = () => {
		setModalVisible(true);
		dbo.firebase.auth()
			.signInWithEmailAndPassword(username, password)
			.then((res) => {
				// console.log(res)
				console.log(res.user.uid);
				console.log('User logged-in successfully!')
				setUsername('');
				setPassword('');
				setErrorMessage('');
				setModalVisible(false);

				navigation.replace('Dash')
			})
			.catch((error) => {
				setErrorMessage(error.message);
				setModalVisible(false);
			})
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
		<View style={styles.container}>
			<KeyboardAvoidingView behavior='position' style={{width:'100%'}}>
				<Pressable onPress={() => {
					setUsername('test@strayspotter.com');
					setPassword('password');
				}}>
					<Text style={styles.errorText}>{errorMessage}</Text>
				</Pressable>
				<Text style={styles.inputLabel}>Email:</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={setUsername}
					placeholder="johnnyappleseed@example.com"
					value={username}
					autoCapitalize='none'
					autoCorrect={false}
					secureTextEntry={false}
				/>
				<Text style={styles.inputLabel}>Password:</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={setPassword}
					placeholder="password"
					value={password}
					autoCapitalize='none'
					autoCorrect={false}
					secureTextEntry={!showPassword} />
			</KeyboardAvoidingView>

			<View style={styles.extraSpace}></View>
			<Pressable style={styles.logInButton} onPress={logInFunc}><Text style={styles.logInButtonText}>Log In</Text></Pressable>
			<Pressable style={styles.signInButton} onPress={() => navigation.navigate("Signup")}><Text style={styles.signInButtonText}>Sign Up</Text></Pressable>
			<LoadingModal isVisible={isModalVisible} />
		</View>
		</TouchableWithoutFeedback>
		);
}

const SignUpScreen = ({navigation, route}) => {

	const [isModalVisible, setModalVisible] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const signUpFunc = () => {
		if (password !== password2) {
			setErrorMessage("Passwords do not match!");
			return;
		}
		setModalVisible(true);
		dbo.firebase.auth().createUserWithEmailAndPassword(username, password)
			.then((res) => {
				console.log(res.user.uid);
				console.log('User registered successfully!')
				setUsername('');
				setPassword('');
				setErrorMessage('');
				setModalVisible(false);

				navigation.replace('Dash');
			})
			.catch((error) => {
				setErrorMessage(error.message);
				setModalVisible(false);
				console.log("error logging in user");
			})
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
		<View style={styles.container}>
			<KeyboardAvoidingView behavior='position' style={{width:'100%'}}> 
				<Text style={styles.errorText}>{errorMessage}</Text>

				<Text style={styles.inputLabel}>Email:</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={setUsername}
					placeholder="johnnyappleseed@example.com"
					value={username}
					autoCapitalize='none'
					autoCorrect={false}
					secureTextEntry={false}
				/>
				<Text style={styles.inputLabel}>Password:</Text>
				<View style={{width:"100%"}}>
					<TextInput
						style={styles.textInput}
						onChangeText={setPassword}
						placeholder="password"
						value={password}
						autoCapitalize='none'
						autoCorrect={false}
						secureTextEntry={!showPassword} />
					<Icon style={{zIndex:100,position:'absolute',right:0,height:20,width:20,backgroundColor:'yellow'}} name="close" type="evilicon" color={theme.colors.primary} />
				</View>
				<Text style={styles.inputLabel}>Confirm Password:</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={setPassword2}
					placeholder="password"
					value={password2}
					autoCapitalize='none'
					autoCorrect={false}
					secureTextEntry={!showPassword} />

			</KeyboardAvoidingView>

			<View style={styles.extraSpace}></View>
			<Pressable style={styles.logInButton} onPress={signUpFunc}><Text style={styles.logInButtonText}>Sign Up</Text></Pressable>
			<Pressable style={styles.signInButton} onPress={() => navigation.goBack()}><Text style={styles.signInButtonText}>Cancel</Text></Pressable>
			<LoadingModal isVisible={isModalVisible}/>
		</View>
		</TouchableWithoutFeedback>
	);
}

function App({navigation, route}) {
	return (
		// <NavigationContainer>
			<Tab.Navigator
				initialRouteName='Map'
				screenOptions={({ route }) => ({
					// for adding custom header, check docs here https://reactnavigation.org/docs/bottom-tab-navigator/#header-related-options
					// lets us set a custom header
					header: ({navigation, route, options}) => {
						return <Header />
					},
					// removes header
					// headerShown:false,
					showLabel: false,
					tabBarIcon: ({ focused, color, size }) => {
						// console.log(color);
						let iconName;
		
						switch (route.name) {
							case 'PostPage':
								iconName = 'camera';
								break;
							case 'Map':
								iconName = 'map';
								break;
							case 'TimeLine':
								iconName = 'paw';
								break;
							case 'Profile':
								iconName = 'person';
								break;
							default :
								iconName = 'question'
						}
			
						// You can return any component that you like here!
						return <Icon name={iconName} color={focused ? theme.colors.primary : theme.colors.foreground} type='fontisto'/>;
					},
					tabBarActiveTintColor: theme.colors.primary,
					tabBarInactiveTintColor: theme.colors.foreground,
					tabBarShowLabel: false,
					tabBarStyle: styles.tabBar,
					initialRouteName: "Map"
			  	})}
			>
				<Tab.Screen name="PostPage" component={PostPage} />
				<Tab.Screen name="Map" component={TimeLine} initialParams={{view:'mapView'}} />
				<Tab.Screen name="TimeLine" component={TimeLine} initialParams={{view:"listView"}} />
				<Tab.Screen name="Profile" component={Profile} options={{headerShown:false}}/>
				
			</Tab.Navigator>
		// </NavigationContainer>
	);
}

const darkMode = Appearance.getColorScheme() === 'dark';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
		alignItems: 'center',
		justifyContent: 'center',
		// paddingTop:theme.spacing.xl*2,
	},
	window: {
		width: '100%',
		flex: 6,
		alignItems: 'center',
		justifyContent: 'center'
	},
	tabBar: {
		backgroundColor:theme.colors.background,
	},
	errorText: {
		color:theme.colors.failure,
		marginVertical:theme.spacing.l,
		marginLeft:'auto',
		marginRight:'auto',
		fontWeight:'bold',
	},
	inputLabel: {
		color:theme.colors.foreground,
		fontWeight:'bold',
		fontSize:24,
		alignSelf:'flex-start',
		
		marginLeft:theme.spacing.l,
		marginTop:theme.spacing.s,
	},
	textInput: {
		width:'90%',
		borderRadius:10,
		borderColor:theme.colors.foreground,
		color:theme.colors.foreground,
		borderWidth:1,
		paddingVertical:theme.spacing.l,
		// textAlign:'center',
		paddingLeft: theme.spacing.l,
		marginBottom: theme.spacing.s,
		marginLeft:'auto',
		marginRight:'auto',
	},
	extraSpace: {
		height: theme.spacing.xl,
	},
	logInButton: {
		width:'40%',
		
		marginBottom:theme.spacing.s,

		paddingVertical:theme.spacing.m,

		backgroundColor:theme.colors.primary,
		borderRadius:theme.spacing.s,
		borderColor:theme.colors.foreground,
		borderWidth:2,

		alignItems:'center',
		justifyContent:'center',
	},
	logInButtonText: {
		color:theme.colors.foreground,
		fontWeight:'bold',
	},
	signInButton: {
		width:'40%',
		
		marginBottom:theme.spacing.s,

		paddingVertical:theme.spacing.m,

		backgroundColor:theme.colors.background,
		borderRadius:theme.spacing.s,
		borderColor:theme.colors.primary,
		borderWidth:2,

		alignItems:'center',
		justifyContent:'center',
	},
	signInButtonText: {
		color:theme.colors.foreground,
		fontWeight:'bold',
	}
});
