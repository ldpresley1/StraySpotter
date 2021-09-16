import React from 'react';
import { Text, View, Appearance } from 'react-native';

const Profile = (props) => {
	return (
		<View style={props.windowStyle}>
			<Text style={{color:'white'}}>This would be your profile, if you had one</Text>
		</View>
	);
}

export default Profile;