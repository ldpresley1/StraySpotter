import React from 'react';
import { Pressable, Image, StyleSheet, Text, View } from 'react-native';

const Navigation = (props) => {
  return (
	<View style={styles.navigation}>
		<Pressable onPress={() => props.setPage(0)} style={ props.page == 0 ? styles.button : [styles.button,{backgroundColor:'#B3E8FC'}]}>
			<Image style={styles.buttonIcon} source={require('../assets/addicon.png')} />
		</Pressable>
		<Pressable onPress={() => props.setPage(1)} style={ props.page == 1 ? styles.button : [styles.button,{backgroundColor:'#B3E8FC'}]}>
			<Image style={styles.buttonIcon} source={require('../assets/mapicon.png')} />
		</Pressable>
		<Pressable onPress={() => props.setPage(2)} style={ props.page == 2 ? styles.button : [styles.button,{backgroundColor:'#B3E8FC'}]}>
			<Image style={styles.buttonIcon} source={require('../assets/clockicon.png')} />
		</Pressable>
		<Pressable onPress={() => props.setPage(3)} style={ props.page == 3 ? styles.button : [styles.button,{backgroundColor:'#B3E8FC'}]}>
			<Image style={styles.buttonIcon} source={require('../assets/pfp.png')} />
		</Pressable>
	</View>
  );
}

export default Navigation;

const styles = StyleSheet.create({
	navigation: {
		width: "100%",
		position:'absolute',
		bottom: 0,
		//flex:1,
		backgroundColor: '#F47174',
		flexDirection: "row",
	},
	button: {
		backgroundColor:'white',
		flex: 1,
		borderTopWidth: 2,
		// borderLeftWidth: 1,
		// borderRightWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 15,
		paddingTop: 15
	},
	buttonIcon: {
		width: 40,
		height: 40,
	},
});
