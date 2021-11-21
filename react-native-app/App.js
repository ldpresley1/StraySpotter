import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Appearance, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, ActivityIndicator, KeyboardAvoidingView, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from 'react-native-elements';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import ImageBrowser from './components/ImageBrowserScreen';
import Header from './components/Header';
import Profile from './components/Profile';
import TimeLine from './components/TimeLine';
import PostPage from './components/PostPage';
import CustomGeolocation from './components/CustomGeolocationScreen';
import { darkTheme, lightTheme } from './components/Themes';
import dbo, { getData, storeData } from './components/dataStorage';
import LoadingModal from './components/LoadingModal';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const theme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme;

function PostStackScreens(){
	return (
		<Stack.Navigator>
			<Stack.Screen name = "PostPage" component = {PostPage} options={{headerShown: false,}} />
			<Stack.Screen name='ImageBrowser' component={ImageBrowser}
        			options={{
        			title: 'Selected 0 files'
      				}} />
			<Stack.Screen name="CustomGeolocation" component = {CustomGeolocation} options={{headerShown: false,}}/>
		</Stack.Navigator>
	)
}
LogBox.ignoreLogs(["Setting a timer"]);//this is to ignore a stupid warning

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

class LogIn extends React.Component {
	
	state = {
		isModalVisible:false,
		username:'',
		password:'',
		showPassword:false,
		errorMessage:'',
		loaded:false,
		rememberMe:false,
	}

	componentDidMount() {
		if (this.state.loaded) return;

		getData("rememberMe").then((data) => {
			if (data === 'true') {
				getData("username").then((data) => {
					if (data) this.setState({username:data});
				});
				getData("password").then((data) => {
					if (data) this.setState({password:data})
				});
				this.setState({rememberMe:true});
			}
			else this.setState({rememberMe:false});
		})
		this.setState({loaded:true});
	}

	logInFunc() {
		this.setState({isModalVisible:true});
		// store login info
		if (this.state.rememberMe) {
			storeData("username",this.state.username);
			storeData("password",this.state.password);
		}

		dbo.firebase.auth()
			.signInWithEmailAndPassword(this.state.username, this.state.password)
			.then((res) => {
				console.log(res.user.uid);
				console.log('User logged-in successfully!')

				this.setState({username:'',password:'',errorMessage:'',isModalVisible:false});

				this.props.navigation.replace('Dash')
			})
			.catch((error) => {
				this.setState({errorMessage:error.message,isModalVisible:false});
			})
	}

	handleCheck(isChecked) {
		// isChecked is always false
		isChecked = !this.state.rememberMe;
		console.log(isChecked);

		this.setState({rememberMe:isChecked});
		if (isChecked) storeData("rememberMe",'true');
		else {
			// remove stored data
			storeData("username","");
			storeData("password","");
			storeData("rememberMe","false");
		}

		// save stuff

	}

	render() {
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={styles.container}>
				<KeyboardAvoidingView behavior='position' style={{width:'100%'}}>
					<Pressable onPress={() => {
						this.setState({username:'test@strayspotter.com',password:'password'});
					}}>
						<Text style={styles.errorText}>{this.state.errorMessage}</Text>
					</Pressable>
					<Text style={styles.inputLabel}>Email:</Text>
					<View style={styles.textInputView}>
						<TextInput
							style={styles.textInput}
							onChangeText={(text) => this.setState({username:text})}
							placeholder="johnnyappleseed@example.com"
							value={this.state.username}
							autoCapitalize='none'
							autoCorrect={false}
							secureTextEntry={false} />
					</View>
					<Text style={styles.inputLabel}>Password:</Text>
					<View style={styles.textInputView}>
						<TextInput
							style={styles.textInput}
							onChangeText={(text)=>this.setState({password:text})}
							placeholder="password"
							value={this.state.password}
							autoCapitalize='none'
							autoCorrect={false}
							secureTextEntry={!this.state.showPassword} />
						<Pressable style={styles.showPasswordButton} onPress={() => this.setState({showPassword:!this.state.showPassword})} >
							<Icon name={this.state.showPassword ? "eye-with-line" : "eye"} type="entypo" color={theme.colors.foreground} />
						</Pressable>
					</View>
				</KeyboardAvoidingView>

				{/* <View style={styles.extraSpace}></View> */}
				<BouncyCheckbox 
					text="Remember Me" 
					textStyle={{textDecorationLine:'none', color:theme.colors.foreground}}
					fillColor={theme.colors.primary}
					style={{marginBottom:theme.spacing.s+theme.spacing.l, marginTop:theme.spacing.s, alignSelf:'flex-start', marginLeft:"10%"}} 
					onPress={(pressed) => {this.handleCheck(pressed)}}
					isChecked={this.state.rememberMe} 
					disableBuiltInState />

				<Pressable style={styles.logInButton} onPress={this.logInFunc.bind(this)}>
					<Text style={styles.logInButtonText}>Log In</Text>
				</Pressable>
				<Pressable style={styles.signInButton} onPress={() => this.props.navigation.navigate("Signup")}>
					<Text style={styles.signInButtonText}>Sign Up</Text>
				</Pressable>

				{/* <Pressable style={styles.signInButton} onPress={() => {
					storeData(this.state.username);
				}}>
					<Text style={styles.signInButtonText}>Save</Text>
				</Pressable>

				<Pressable style={styles.signInButton} onPress={() => {
					getData().then((data)=>{
						this.setState({user:data});
					})
				}}>
					<Text style={styles.signInButtonText}>{this.state.user}</Text>
				</Pressable> */}
				<LoadingModal isVisible={this.state.isModalVisible} />
			</View>
			</TouchableWithoutFeedback>
		);
	}
}

const SignUpScreen = ({navigation, route}) => {

	const [isModalVisible, setModalVisible] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);
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
				<View style={styles.textInputView}>
					<TextInput
						style={styles.textInput}
						onChangeText={setUsername}
						placeholder="johnnyappleseed@example.com"
						value={username}
						autoCapitalize='none'
						autoCorrect={false}
						secureTextEntry={false} />
				</View>
				<Text style={styles.inputLabel}>Password:</Text>
				<View style={styles.textInputView}>
					<TextInput
						style={styles.textInput}
						onChangeText={setPassword}
						placeholder="password"
						value={password}
						autoCapitalize='none'
						autoCorrect={false}
						secureTextEntry={!showPassword} />
					<Pressable style={styles.showPasswordButton} onPress={() => setShowPassword(!showPassword)} >
						<Icon name={showPassword ? "eye-with-line" : "eye"} type="entypo" color={theme.colors.foreground} />
					</Pressable>
				</View>
				<Text style={styles.inputLabel}>Confirm Password:</Text>
				<View style={styles.textInputView}>
					<TextInput
						style={styles.textInput}
						onChangeText={setPassword2}
						placeholder="password"
						value={password2}
						autoCapitalize='none'
						autoCorrect={false}
						secureTextEntry={!showPassword2} />
					<Pressable style={styles.showPasswordButton} onPress={() => setShowPassword2(!showPassword2)} >
						<Icon name={showPassword2 ? "eye-with-line" : "eye"} type="entypo" color={theme.colors.foreground} />
					</Pressable>
				</View>
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
							case 'PostStackScreens':
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
        		<Tab.Screen name='PostStackScreens' component={PostStackScreens}/>
				<Tab.Screen name="Map" component={TimeLine} initialParams = {{view: 'mapView'}} />
				<Tab.Screen name="TimeLine" component={TimeLine} initialParams = {{view: 'listView'}}  />
				<Tab.Screen name="Profile" component={Profile} options={{headerShown:false}} />
				
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
	textInputView: {
		marginBottom:theme.spacing.s,
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
	showPasswordButton: {
		height:'100%',
		position:'absolute',
		top:0,
		right:'10%',
		justifyContent:'center',
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
