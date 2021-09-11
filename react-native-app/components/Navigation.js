import React from 'react';
import { Pressable, Image, StyleSheet, Text, View } from 'react-native';

const Navigation = (props) => {
  return (
	<View style={styles.navigation}>
		<Pressable onPress={() => props.setPage(0)} style={styles.button}>
			<Image style={styles.buttonIcon} source={require('../assets/addicon.png')} />
		</Pressable>
		<Pressable onPress={() => props.setPage(1)} style={styles.button}>
			<Image style={styles.buttonIcon} source={require('../assets/mapicon.png')} />
		</Pressable>
		<Pressable onPress={() => props.setPage(2)} style={styles.button}>
			<Image style={styles.buttonIcon} source={require('../assets/clockicon.png')} />
		</Pressable>
		<Pressable onPress={() => props.setPage(3)} style={styles.button}>
			<Image style={styles.buttonIcon} source={require('../assets/pfp.png')} />
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
		flex:1,
		// backgroundColor: 'red',
		flexDirection: "row",
	},
	button: {
		// backgroundColor:'white',
		flex: 1,
		borderTopWidth: 2,
		// borderLeftWidth: 1,
		// borderRightWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 40,
		paddingTop: 20
	},
	buttonIcon: {
		width: 50,
		height: 50,
	},
});