import React from 'react';
import { Text, View } from 'react-native';

const PostPage = (props) => {
	return (
		<View style={props.windowStyle}>
			<Text style={{color:'white'}}>This is where you go to post stuff</Text>
		</View>
	);
}

export default PostPage;