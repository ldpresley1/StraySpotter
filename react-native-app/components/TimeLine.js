import React, {useRef, useState} from 'react';
import { Text, View, FlatList, StyleSheet, ScrollView, Image, Dimensions, Appearance, Pressable, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { darkTheme, lightTheme } from './Themes';
import * as Linking from 'expo-linking';
import ImageCarousel from './ImageCarousel';

import MapListView from './Map'
import ScrollListView from './ScrollListView';

import dbo, {postData} from "./dataStorage";

const theme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


// dbo.firebase.firestore()
//   .collection('StraysFound')
//   .doc('tm1qDWpDw314lRRhPkzu')
//   .get()
//   .then(documentSnapshot => {
//     console.log('User exists: ', documentSnapshot.exists);

//     if (documentSnapshot.exists) {
//       console.log('User data: ', documentSnapshot.data());
//     }
//   });

class TimeLine extends React.Component {
// const TimeLine = ({route, navigation}) => {
	state = {
		loaded:false,
	}

	componentDidMount() {
		if (!this.state.loaded) {
			this.loadPosts();
		}
	}

	loadPosts() {
		this.setState({loaded:false});
		if (this.props.uid) {
			postData.getByUID(this.props.uid).then(() => {
				this.setState({loaded:true});
			});
		}
		else {
			postData.getByDistance().then(() => {
				this.setState({loaded:true});
			});
		}
	}

	render() {
		// const flatListRef = useRef();
		// const toTop = () => {
		// 	flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
		// }
		//console.log(this.state.strayList);
		let compareMe;
		if (this.props.view) compareMe = this.props.view;
		else if (this.props.route.params) compareMe = this.props.route.params.view;
		else compareMe = 'listView';
		
		
		if (compareMe !== 'mapView') {
			// notes for timeline render
			// * ScrollView loads all objects
			// * FlatList uses lazy rendering
			// * for section support (don't know what that is), use SectionList 
			return (
				<View style={styles.window}>
					<ScrollListView strayList={this.props.uid ? postData.strayListByUID : postData.strayListByDistance} loaded={this.state.loaded} refresh={this.loadPosts.bind(this)}/>
				</View>
			);
		} else if (compareMe === 'mapView') {
			return (
				<View style={styles.window}>
					<MapListView strayList={this.props.uid ? postData.strayListByUID : postData.strayListByDistance} />
				</View>
			);
		}
	}
}

export default TimeLine;

const styles = StyleSheet.create({
	window: {
		width: '100%',
		flex: 6,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: theme.colors.background,
	},
});