import React from 'react';
import { Pressable, Image, StyleSheet, Text, View } from 'react-native';
import {useFonts} from 'expo-font';

const Header = (props) => {
	const [loaded] = useFonts({
		SatisfyRegular: require('../assets/fonts/Satisfy-Regular.ttf'),
		PacificoRegular: require('../assets/fonts/Pacifico-Regular.ttf'),
	});

	if (!loaded) return null;
	return (
		<View style={styles.header}>
			<Text style={styles.headerText}>Stray Spotter</Text>
		</View>
	);
}

export default Header;

const styles = StyleSheet.create({
	header: {
		width:"100%",
		position:'relative',
		// bottom: 0,
		flex:1,
		backgroundColor:'#121212',
		borderColor:'#303030',
		borderBottomWidth:1,
		justifyContent:'flex-end',
		alignItems:'center'
	},
	headerText: {
		color:'white',
		fontSize:40,
		paddingBottom:10,
		fontFamily:'PacificoRegular',
		// fontFamily:'SatisfyRegular',
	},
});