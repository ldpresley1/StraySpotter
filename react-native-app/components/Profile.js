import React from 'react';
import { Text, View, Appearance } from 'react-native';
import { darkTheme, lightTheme } from './Themes';

const theme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme

const Profile = (props) => {
	return (
		<View style={props.windowStyle}>
			<Text style={{color:theme.colors.foreground}}>This would be your profile, if you had one</Text>
		</View>
	);
}

export default Profile;