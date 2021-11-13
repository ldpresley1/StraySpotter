import React, {useRef, useState, useMemo, useCallback} from 'react';
import { Text, View, FlatList, StyleSheet, ScrollView, Image, Dimensions, Appearance, Pressable, Platform, Modal } from 'react-native';
import { Icon } from 'react-native-elements';
import { darkTheme, lightTheme } from './Themes';
import * as Linking from 'expo-linking';
import ImageCarousel from './ImageCarousel';
import dbo from "./dataStorage";

const theme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
var type = "temp";

export class Post extends React.Component {
	state = {}
		isModalVisible:false
	}

	setModalVisible = (visible) => {
		this.setState({isModalVisible: visible});
	}
	// Maybe use horizontal flat list for photos


	render() {
		return (
			<View style={styles.post}>
				<ImageCarousel items = {this.props.images} timeline={true}/>
				
				<View style={styles.postHeader}>
					<Text style={styles.title}> {this.props.title} </Text>
					<Pressable onPress={() => openMap(this.props.cord)}>
						<Icon style={styles.iconStyle} name='map-marker-alt' type='fontisto' color={theme.colors.foreground}/>
					</Pressable>
					<Pressable onPress={() => this.setModalVisible(true)}>
						<Icon style={styles.iconStyle} name='bell-alt' type='fontisto' color={theme.colors.foreground}/>
					</Pressable>
				</View>
				<Modal
				  animationType="slide"
				  transparent={true}
				  visible={this.state.isModalVisible}
				  onRequestClose={() => {
					this.setModalVisible(!modalVisible);
				  }}
				>
				  <View style={styles.centeredView}>
					<View style={styles.modalView}>
					  <Text style={styles.modalText}>Why would you like to remove this post?</Text>
					  <Pressable
						  style={[styles.button, styles.buttonClose]}
						  onPress={() => {
							  flagPost(this.props.id, "This stray has been found!"),
							  this.setModalVisible(!this.state.isModalVisible)
						  }}
						>
						  <Text style={styles.textStyle}>This stray has been found!</Text>
					  </Pressable>
					  <Pressable
						style={[styles.button, styles.buttonClose]}
						onPress={() => {
							flagPost(this.props.id, "Inappropriate Content"),
							this.setModalVisible(!this.state.isModalVisible)
						}}
					  >
						<Text style={styles.textStyle}>Inappropriate Content</Text>
					  </Pressable>
					  <Pressable
						style={[styles.button, styles.buttonClose]}
						onPress={() => {
							flagPost(this.props.id, "cancelled"),
							this.setModalVisible(!this.state.isModalVisible)
						}}>
						<Text style={styles.textStyle}>Cancel</Text>
					  </Pressable>
					</View>
				  </View>
				</Modal>
				<Text style={styles.description}>{this.props.description}</Text>
				<View style={styles.tagContainer}>
					{
						this.props.tags.map((tagText, index) => {
							return <Text key={index} style={styles.tag}>{tagText}</Text>
						})
					}
				</View>
			</View>
		)
	}
}


// this is copied directly from stack overflow
function openMap(cord) {
	const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
	const latLng = `${cord.lat},${cord.long}`;
	const label = 'Custom Label';
	const url = Platform.select({
		ios: `${scheme}${label}@${latLng}`,
		android: `${scheme}${latLng}(${label})`
	});

		
	Linking.openURL(url);
}

function pressType(buttonType){
	console.log(buttonType);
}

function flagPost(strayID, reason){
//   flagPost(this.props.id, type),
	if(reason != "cancelled"){
		dbo.firebase.firestore()
			.collection('StraysFound')
			.doc(strayID)
			.update({
				flag: true
			});
		console.log(strayID, "flagged")

		dbo.firebase.firestore()
			.collection('Reporting')
			.add({
				flagged: true,
				postID: strayID,
				info: reason
			});
		console.log(strayID, "added to the reporting db.")
	}
}

const renderPost = ({ item }) => (
	<Post description={item.description} title={item.title} images={item.images} cord={item.cord} tags={item.tags} id = {item.id}/>
);

export default class ScrollListView extends React.Component {

	render() {
		// const flatListRef = useRef();
		// const toTop = () => {
		// 	flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
		// }

		if (this.props.strayList.length < 1) {
			return (
				<>
					<Text style={styles.textStyle}>Looks like there aren't any posts</Text>
					<Text style={[styles.textStyle,{fontSize:50, marginTop:theme.spacing.m}]}>😿</Text>
				</>
			)
		}

		// notes for timeline render
		// * ScrollView loads all objects
		// * FlatList uses lazy rendering
		// * for section support (don't know what that is), use SectionList 
		return (
				// <Pressable style={styles.toTop} onPress={toTop}></Pressable>
				// <Pressable style={styles.toTop}></Pressable>
				<FlatList
					// ref={flatListRef}
					style={{width:screenWidth}}
					data={this.props.strayList}
					renderItem={renderPost}
					keyExtractor={post => post.id}
					numColumns={1}
					contentContainerStyle={styles.flatlist}
					refreshing={!this.props.loaded}
					onRefresh={this.props.refresh}
				/>
		);
	}
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
	},
	modalView: {
		margin: 20,
		backgroundColor: theme.colors.background,
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: theme.colors.foreground,
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	button: {
		borderRadius: 20,
		padding: 15,
		elevation: 2,
		marginVertical: 5
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: theme.colors.primary,
	},
	textStyle: {
		color: theme.colors.foreground,
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		color: theme.colors.foreground,
		marginBottom: 15,
		fontWeight: "bold",
		textAlign: "center"
	},
	toTop: {
		position:'absolute',
		height:Platform.OS === 'ios' ? 100 : 80, // roughly the size of the header
		width:'100%',
		// backgroundColor:'red',
		backgroundColor:'transparent',
		top:Platform.OS === 'ios' ? -20 : 0, // same as height
		zIndex: 100,
		elevation:100,
		opacity: 0,
	},
	flatlist: {
		// DO NOT SET FLEX TO 1
		// backgroundColor: 'blue',
	},
	post: {
		width: screenWidth,
		flex: 1,
		paddingBottom:theme.spacing.m,
		overflow:'hidden',
	},
	scrollViewContainer: {
		flex:1,
		width:screenWidth,
		position:'relative',
	},
	imageScroller: {
		flex:1,
		width:screenWidth,
	},
	postImage: {
		height:screenWidth,
		width:screenWidth
	},
	paging: {
		flexDirection:'row',
		position:'absolute',
		bottom:0,
		alignSelf:'center',
		backgroundColor:'#00000050',
		borderTopEndRadius:10,
		borderTopLeftRadius:10,
	},
	pagingText: {
		margin: 5,
		color:'grey'
	},
	pagingTextActive: {
		margin: 5,
		color: 'white'
	},
	postHeader: {
		flex:1,
		flexDirection:'row',
		justifyContent: "space-between",
		alignItems:'center',
	},
	title: {
		fontSize: 32,
		// textDecorationLine: 'underline',
		marginVertical:theme.spacing.s,
		marginLeft:theme.spacing.s,
		color:theme.colors.foreground,
		fontWeight:'bold',
	},
	iconStyle: {
		marginRight:theme.spacing.m,
		// backgroundColor:'red'
	},
	description: {
		...theme.textVariants.body,
		marginHorizontal:theme.spacing.m,
		paddingBottom:theme.spacing.s,
		color:theme.colors.foreground
	},
	tagContainer: {
		flex:1,
		flexDirection:'row',
		flexWrap:'wrap'
	},
	tag: {
		backgroundColor:theme.colors.primary,
		color:theme.colors.foreground,
		padding:theme.spacing.s,
		marginHorizontal:theme.spacing.s,
		marginVertical:4,
		borderRadius:10,
		overflow:'hidden',
		// fontWeight:'bold',
	}
});