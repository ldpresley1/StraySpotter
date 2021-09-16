import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Appearance } from 'react-native';

import Header from './components/Header';
import Navigation from './components/Navigation';
import Profile from './components/Profile';
import TimeLine from './components/TimeLine';
import Map from './components/Map';
import PostPage from './components/PostPage';
import { darkTheme, lightTheme } from './components/Themes';

const theme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme;
// const theme = darkTheme;

export default function App() {
	const [page, setPage] = useState(1); // defaults to the map

	let currentRender;
	if (page == 0) currentRender = <PostPage windowStyle={styles.window}/>;
	else if (page == 1) currentRender = <Map windowStyle={styles.window}/>
	else if (page == 2) currentRender = <TimeLine windowStyle={styles.window}/>
	else if (page == 3) currentRender = <Profile windowStyle={styles.window}/>;

	return (
		<View style={styles.container}>
			<Header />
			{ currentRender }
			<Navigation setPage={setPage} page={page}/>
		</View>
	);
}

const darkMode = Appearance.getColorScheme() === 'dark';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.primary,
		alignItems: 'center',
		justifyContent: 'center',
	},
	window: {
		width: '100%',
		flex: 6,
		alignItems: 'center',
		justifyContent: 'center'
	},
});
