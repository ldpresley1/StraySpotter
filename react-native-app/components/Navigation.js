import React from 'react';
import { Pressable, Image, StyleSheet, Text, View, Appearance } from 'react-native';
import { Icon } from 'react-native-elements';
import { darkTheme, lightTheme } from './Themes';

const theme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme

const {Platform} = React;

const Navigation = (props) => {
  return (
	<View style={styles.navigation}>
		<Pressable onPress={() => props.setPage(0)} style={ props.page != 0 ? styles.button : styles.buttonActive}>
			{
				props.page != 0 ?
				<Icon style={styles.iconStyle} name='camera' type='fontisto' color={theme.colors.foreground}/> :
				<Icon style={styles.iconStyle} name='camera' type='fontisto' color={theme.colors.background}/>
			}
		</Pressable>
		<Pressable onPress={() => props.setPage(1)} style={ props.page != 1 ? styles.button : styles.buttonActive}>
			{
				props.page != 1 ?
				<Icon style={styles.iconStyle} name='map' type='fontisto' color={theme.colors.foreground}/> :
				<Icon style={styles.iconStyle} name='map' type='fontisto' color={theme.colors.background}/>
			}
		</Pressable>
		<Pressable onPress={() => props.setPage(2)} style={ props.page != 2 ? styles.button : styles.buttonActive}>
			{
				props.page != 2 ?
				<Icon style={styles.iconStyle} name='paw' type='fontisto' color={theme.colors.foreground}/> :
				<Icon style={styles.iconStyle} name='paw' type='fontisto' color={theme.colors.background}/>
			}
		</Pressable>
		<Pressable onPress={() => props.setPage(3)} style={ props.page != 3 ? styles.button : styles.buttonActive}>
			{
				props.page != 3 ?
				<Icon style={styles.iconStyle} name='person' type='fontisto' color={theme.colors.foreground}/> :
				<Icon style={styles.iconStyle} name='person' type='fontisto' color={theme.colors.background}/>
			}
		</Pressable>
	</View>
  );
}

export default Navigation;

const styles = StyleSheet.create({
	navigation: {
		width: "100%",
		// position:'absolute',
		// bottom: 0,
		flex: (Platform.OS === 'ios') ? .74 : .54,
		backgroundColor: '#121212',
		flexDirection: "row",
	},
	button: {
		backgroundColor:theme.colors.background,
		flex: 1,
		borderTopWidth: 1,
		borderColor:theme.colors.foreground,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingTop: (Platform.OS === 'ios') ? 20 : 15,
		paddingBottom: (Platform.OS === 'ios') ? 0 : 0,
	},
	buttonActive: {
		backgroundColor:theme.colors.foreground, // the rest of button is the same
		flex: 1,
		borderTopWidth: 1,
		borderColor:theme.colors.foreground,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingTop: (Platform.OS === 'ios') ? 20 : 15,
		paddingBottom: (Platform.OS === 'ios') ? 0 : 0,
	},
	iconStyle: {
		// width:100,
		flex:1,
	},
});
