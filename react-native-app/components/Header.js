import React from 'react';
import { Pressable, Image, StyleSheet, Text, View, Appearance, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import {useFonts} from 'expo-font';
import { darkTheme, lightTheme } from './Themes';

const theme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme

const Header = (props) => {
	const [loaded] = useFonts({
		SatisfyRegular: require('../assets/fonts/Satisfy-Regular.ttf'),
		PacificoRegular: require('../assets/fonts/Pacifico-Regular.ttf'),
	});

	if (!loaded) return null;
	return (
		<View style={styles.header}>
			{
			props.nav ? 
				<Pressable style={styles.iconButton} onPress={() => props.nav.goBack()}>
					<Icon style={styles.icon} color={theme.colors.foreground} name='angle-left' type='fontisto' />
				</Pressable> 
				: <></>
			}
			<Text style={styles.headerText}>Stray Spotter</Text>
			{/* <Icon style={styles.icon} name='search' type='fontisto' color={theme.colors.foreground}/> */}
		</View>
	);
}

export default Header;

const styles = StyleSheet.create({
	header: {
		width:"100%",
		// React Navigation uses height to calculate, like so
		//  does not use flex :(
		height: 100,
		position:'relative',
		backgroundColor:theme.colors.background,
		borderColor:theme.colors.foreground,
		borderBottomWidth:1,
		justifyContent:'space-around',
		alignItems:'flex-end',
		flexDirection:'row',
		zIndex:3,
	},
	headerText: {
		color:theme.colors.foreground,
		paddingBottom:theme.spacing.s,
		...theme.textVariants.header,
		// fontFamily:'SatisfyRegular',
	},
	iconButton: {
		position:'absolute',
		bottom:20,
		left:20,
	},
	icon: {
		// paddingBottom:theme.spacing.l,
		...theme.textVariants.header
	}
});
