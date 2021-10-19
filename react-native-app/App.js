import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Appearance } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from 'react-native-elements';

import Header from './components/Header';
import Navigation from './components/Navigation';
import Profile from './components/Profile';
import TimeLine from './components/TimeLine';
import Map from './components/Map';
import PostPage from './components/PostPage';
import { darkTheme, lightTheme } from './components/Themes';

const Tab = createBottomTabNavigator();

const theme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme;

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
				<Tab.Screen name="Map" component={Map} />
				<Tab.Screen name="TimeLine" component={TimeLine} />
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
