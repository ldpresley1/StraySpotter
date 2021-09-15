import React from 'react';
import { Pressable, Image, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

const {Platform} = React;

const Navigation = (props) => {
  return (
	<View style={styles.navigation}>
		<Pressable onPress={() => props.setPage(0)} style={ props.page != 0 ? styles.button : [styles.button,{backgroundColor:'#FFFFFFC5'}]}>
			{
				props.page != 0 ?
				<Icon style={styles.iconStyle} name='camera' type='fontisto' color='white' /> :
				<Icon style={styles.iconStyle} name='camera' type='fontisto' />
			}
		</Pressable>
		<Pressable onPress={() => props.setPage(1)} style={ props.page != 1 ? styles.button : [styles.button,{backgroundColor:'#FFFFFFC5'}]}>
			{
				props.page != 1 ?
				<Icon style={styles.iconStyle} name='map' type='fontisto' color='white'/> :
				<Icon style={styles.iconStyle} name='map' type='fontisto' />
			}
		</Pressable>
		<Pressable onPress={() => props.setPage(2)} style={ props.page != 2 ? styles.button : [styles.button,{backgroundColor:'#FFFFFFC5'}]}>
			{
				props.page != 2 ?
				<Icon style={styles.iconStyle} name='paw' type='fontisto' color='white'/> :
				<Icon style={styles.iconStyle} name='paw' type='fontisto' />
			}
		</Pressable>
		<Pressable onPress={() => props.setPage(3)} style={ props.page != 3 ? styles.button : [styles.button,{backgroundColor:'#FFFFFFC5'}]}>
			{
				props.page != 3 ?
				<Icon style={styles.iconStyle} name='person' type='fontisto' color='white'/> :
				<Icon style={styles.iconStyle} name='person' type='fontisto' />
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
		flex: (Platform.OS === 'ios') ? .7 : .5,
		backgroundColor: '#121212',
		flexDirection: "row",
	},
	button: {
		// backgroundColor:'white',
		flex: 1,
		borderTopWidth: 1,
		borderColor:'#303030',
		// borderLeftWidth: 1,
		// borderRightWidth: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingTop: (Platform.OS === 'ios') ? 20 : 15,
		paddingBottom: (Platform.OS === 'ios') ? 0 : 0,
	},
	iconStyle: {
		width:100,
		backgroundColor:'#00000000'
	},
});
