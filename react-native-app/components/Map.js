import React from 'react';
import { Text, View, StyleSheet, Image, Dimensions, Appearance, Pressable, Modal, ScrollView, RefreshControl } from 'react-native';
import { Icon } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import { darkTheme, lightTheme } from './Themes';

import {Post} from './ScrollListView';
import Header from './Header';

const theme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class MapListView extends React.Component {

	state = {
		isModalVisible:false,
		currentPost:null,
	}

	showPost(postData) {
		// console.log(postData);
		this.setState({isModalVisible:true, currentPost:postData})
	}

	render() {
		const mapRegion = {
			latitude: 33.2083,
			longitude: -87.5504,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		};
		return (
			<View style={{width:'100%',height:'100%'}}>
			<MapView
				style={{ alignSelf: 'stretch', height: '100%' }}
				region={mapRegion}
				showsUserLocation = {true} >

				{
				this.props.strayList.map( (data, index) => {
					// console.log(index, data);
					// console.log(index, data.cord);
					return (
						<Marker
							coordinate={{latitude:data.cord.lat, longitude:data.cord.long}}
							title={data.title}
							description={data.description}
							key={data.id} 
							onCalloutPress={() => this.showPost(data)}>

							<Image source={{uri:data.images[0]}} style={styles.pinThumbnail} />
						</Marker>
					);
				})
				}
			</MapView>
			<Modal visible={this.state.isModalVisible} animationType="slide">
				
				{this.state.currentPost ? 
					<View style={{ width:'100%',height:'100%', backgroundColor:theme.colors.background}}>
						<Header />
						<ScrollView refreshControl={
								<RefreshControl
									refreshing={false}
									onRefresh={() => this.setState({isModalVisible:false})}
								/>
							}>
							<Post key={1} description={this.state.currentPost.description} title={this.state.currentPost.title} images={this.state.currentPost.images} cord={this.state.currentPost.cord} tags={this.state.currentPost.tags} id = {this.state.currentPost.id}/>
						</ScrollView>
						<Pressable style={{position:'absolute', bottom:theme.spacing.xl, alignSelf:'center'}} onPress={() => this.setState({isModalVisible:false})}>
							{/* <Text>X</Text> */}
							<Icon name={'close'} color={theme.colors.foreground} type='fontisto' size={50}/>
						</Pressable>
					</View>
				 :
					<View style={{ flex: 1, justifyContent:"center",alignItems:"center" }}>
						<Pressable style={{backgroundColor:'white',padding:15}} onPress={() => this.setState({isModalVisible:false})}>
							<Text>That's crazy dude. I can't find the post you're looking for.</Text>
						</Pressable>
					</View>
				}
			</Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	pinThumbnail: {
	  height: 40,
	  width:40,
	  borderRadius: 40/2
	},
});
