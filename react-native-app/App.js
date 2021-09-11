import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Navigation from './components/Navigation';
import Profile from './components/Profile';
import TimeLine from './components/TimeLine';
import Map from './components/Map';
import PostPage from './components/PostPage';

export default function App() {
	const [page, setPage] = useState(2); // defaults to the timeline

	let currentRender;
	if (page == 0) currentRender = <PostPage windowStyle={styles.window}/>;
	else if (page == 1) currentRender = <Map windowStyle={styles.window}/>
	else if (page == 2) currentRender = <TimeLine windowStyle={styles.window}/>
	else if (page == 3) currentRender = <Profile windowStyle={styles.window}/>;

	return (
		<View style={styles.container}>
			{ currentRender }
			<Navigation setPage={setPage}/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	window: {
		// backgroundColor: 'yellow',
		width: '100%',

		flex:6,

		paddingTop: 30,
		alignItems: 'center',
		justifyContent: 'center'
	},
});
