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
	
	let headerRight = <></>;
	if (props.options?.headerRight) {
		const passedComponent = props.options.headerRight();
		if (!passedComponent) headerRight=<></>;
		else headerRight = (
			<Pressable style={styles.iconButtonRight} hitSlop={20} onPress={passedComponent.props.onPress}>
				<Icon style={styles.icon} color={theme.colors.foreground} name='save' type='fontisto' />
			</Pressable>
		);
	}

	if (!loaded) return null;

	return (
		<View style={styles.header}>
			{
				props.navFunc ? 
					<Pressable style={styles.iconButton} hitSlop={20} onPress={() => props.navFunc()}>
						<Icon style={styles.icon} color={theme.colors.foreground} name='angle-left' type='fontisto' />
					</Pressable> 

				: props.nav ?
					<Pressable style={styles.iconButton} hitSlop={20} onPress={() => props.nav.goBack()}>
						<Icon style={styles.icon} color={theme.colors.foreground} name='angle-left' type='fontisto' />
					</Pressable> 
				: <></>
			}
			<Text style={styles.headerText}>Stray Spotter</Text>

			{ props.options?.headerRight ?
				headerRight :
				<></>
			}
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
	iconButtonRight: {
		position:'absolute',
		bottom:20,
		right:20,
	},
	icon: {
		// paddingBottom:theme.spacing.l,
		...theme.textVariants.header
	}
});
