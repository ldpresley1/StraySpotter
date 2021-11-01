import React, {useRef, useState} from 'react';
import { Text, View, FlatList, StyleSheet, ScrollView, Image, Dimensions, Appearance, Pressable, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { darkTheme, lightTheme } from './Themes';
import * as Linking from 'expo-linking';
import dbo from "./dataStorage";

const theme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


class Post extends React.Component {
	state = {
		page:0
	}
	// Maybe use horizontal flat list for photos

	change = ({nativeEvent}) => {
		const slide = Math.ceil((nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)-.5);
		if (slide != this.state.page) {
			this.setState({page:slide});
		}
	}

	render() {
		return (
			<View style={styles.post}>
				{
				this.props.images ?
					(
						<View style={styles.scrollViewContainer}>
							<ScrollView 
								style={styles.imageScroller} 
								pagingEnabled horizontal 
								showsHorizontalScrollIndicator={false}

								// it says using bigger numbers here 
								// increases performance by lowering how 
								// quickly it checks. It always seems to 
								// at a very high rate. Do not know what 
								// number it is best to put this at
								scrollEventThrottle={64}
								onScroll={this.change}>
								{
									this.props.images.map((imageUrl, index) => {
										return <Image 
											key={index} 
											style={styles.postImage} 
											source={{uri: imageUrl}} />
									})
								}
							</ScrollView>
							{
								this.props.images.length > 1 ? 
								<View style={styles.paging}>
									{
										this.props.images.map((imageUrl, index) => {
											return <Text key={index} style={this.state.page == index ? styles.pagingTextActive : styles.pagingText}>{'\u2B24'}</Text>
										})
									}
								</View> :
								<></>
							}
						</View>
					)
					: <></>
				}
				<View style={styles.postHeader}>
					<Text style={styles.title}> {this.props.title} </Text>
					<Pressable onPress={() => openMap(this.props.cord)}>
						<Icon style={styles.iconStyle} name='map-marker-alt' type='fontisto' color={theme.colors.foreground}/>
					</Pressable>
					<Pressable onPress={() => flagPost(this.props.id)}>
					    <Icon style={styles.iconStyle} name='map-marker-alt' type='fontisto' color={theme.colors.foreground}/>
					</Pressable>
				</View>
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

function flagPost(strayID){
    dbo.firebase.firestore()
        .collection('StraysFound')
        .doc(strayID)
        .update({
            flag: true
        });
    console.log('Post flagged!');
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
                />
        );
	}
}

const styles = StyleSheet.create({
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