import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Appearance } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from 'react-native-elements';

import ImageBrowser from './components/ImageBrowserScreen';
import Header from './components/Header';
import Profile from './components/Profile';
import TimeLine from './components/TimeLine';
import PostPage from './components/PostPage';
import CustomGeolocation from './components/CustomGeolocationScreen';
import { darkTheme, lightTheme } from './components/Themes';

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
export default function App() {
	return (
		<NavigationContainer>
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
				<Tab.Screen name="Profile" component={Profile} />
				
			</Tab.Navigator>
		</NavigationContainer>
	);
}

const darkMode = Appearance.getColorScheme() === 'dark';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
		alignItems: 'center',
		justifyContent: 'center',
	},
	window: {
		width: '100%',
		flex: 6,
		alignItems: 'center',
		justifyContent: 'center'
	},
	tabBar: {
		backgroundColor:theme.colors.background,
	}
});
