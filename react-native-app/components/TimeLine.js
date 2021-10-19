import React, {useRef, useState} from 'react';
import { Text, View, FlatList, StyleSheet, ScrollView, Image, Dimensions, Appearance, Pressable, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { darkTheme, lightTheme } from './Themes';
import * as Linking from 'expo-linking';

import dbo, {getStrays} from "./dataStorage";

const theme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


dbo.firebase.firestore()
  .collection('StraysFound')
  .doc('tm1qDWpDw314lRRhPkzu')
  .get()
  .then(documentSnapshot => {
    console.log('User exists: ', documentSnapshot.exists);

    if (documentSnapshot.exists) {
      console.log('User data: ', documentSnapshot.data());
    }
  });







const DATA = [
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'First Item',
		description: "This is the post's description. This is where you'll put details about the animal.",
		images: ['https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2020/04/30/Pictures/_70e9d6ee-8af0-11ea-8bae-d48e751bd032.jpeg','https://i.cbc.ca/1.5256404.1566499707!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/cat-behaviour.jpg','https://pyxis.nymag.com/v1/imgs/424/858/e6c66c3a1992e711bca0137b754fea749f-cat-law.rsquare.w700.jpg','https://images-na.ssl-images-amazon.com/images/I/71%2BmDoHG4mL.png'],
		cord: {lat:33.209953358934264,long:-87.5463168},
		tags: ['Cat','Calico','Orange','Medium','Young','Collar','Multilingual']
	},
	{
		id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
		title: 'Second Item',
		description: "This is the post's description. This is where you'll put details about the animal.",
		images: ['https://i.cbc.ca/1.5256404.1566499707!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/cat-behaviour.jpg','https://pyxis.nymag.com/v1/imgs/424/858/e6c66c3a1992e711bca0137b754fea749f-cat-law.rsquare.w700.jpg','https://images-na.ssl-images-amazon.com/images/I/71%2BmDoHG4mL.png'],
		cord: {lat:33.209953358934264,long:-87.5463168},
		tags: ['Cat']
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d72',
		title: 'Third Item',
		description: "This is the post's description. This is where you'll put details about the animal.",
		images: ['https://upload.wikimedia.org/wikipedia/commons/f/f5/Sketch_Of_My_Dog_.png'],
		cord: {lat:33.209953358934264,long:-87.5463168},
		tags: ['Dog','Brown','Medium']
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d73',
		title: 'Fourth Item',
		description: "This is the post's description. This is where you'll put details about the animal.",
		images: ['https://pyxis.nymag.com/v1/imgs/424/858/e6c66c3a1992e711bca0137b754fea749f-cat-law.rsquare.w700.jpg','https://images-na.ssl-images-amazon.com/images/I/71%2BmDoHG4mL.png'],
		cord: {lat:33.209953358934264,long:-87.5463168},
		tags: ['Cat','Tabby','Green','Business Savvy']
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d74',
		title: 'Fifth Item',
		description: "This is the post's description. This is where you'll put details about the animal.",
		images: ['https://images-na.ssl-images-amazon.com/images/I/71%2BmDoHG4mL.png'],
		cord: {lat:33.209953358934264,long:-87.5463168},
		tags: ['Cat','A Child','Orange','Smol']
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d75',
		title: 'Sixth Item',
		description: "This is the post's description. This is where you'll put details about the animal.",
		images: ['https://i.cbc.ca/1.5256404.1566499707!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/cat-behaviour.jpg','https://pyxis.nymag.com/v1/imgs/424/858/e6c66c3a1992e711bca0137b754fea749f-cat-law.rsquare.w700.jpg','https://images-na.ssl-images-amazon.com/images/I/71%2BmDoHG4mL.png'],
		cord: {lat:33.209953358934264,long:-87.5463168},
		tags: ['Cat','Calico','Orange','Medium']
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d76',
		title: 'Seventh Item',
		description: "This is the post's description. This is where you'll put details about the animal.",
		images: ['https://i.cbc.ca/1.5256404.1566499707!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/cat-behaviour.jpg','https://pyxis.nymag.com/v1/imgs/424/858/e6c66c3a1992e711bca0137b754fea749f-cat-law.rsquare.w700.jpg','https://images-na.ssl-images-amazon.com/images/I/71%2BmDoHG4mL.png'],
		cord: {lat:33.209953358934264,long:-87.5463168},
		tags: ['Cat','Calico','Orange','Medium']
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d77',
		title: 'Eighth Item',
		description: "This is the post's description. This is where you'll put details about the animal.",
		images: ['https://i.cbc.ca/1.5256404.1566499707!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/cat-behaviour.jpg','https://pyxis.nymag.com/v1/imgs/424/858/e6c66c3a1992e711bca0137b754fea749f-cat-law.rsquare.w700.jpg','https://images-na.ssl-images-amazon.com/images/I/71%2BmDoHG4mL.png'],
		cord: {lat:33.209953358934264,long:-87.5463168},
		tags: ['Cat','Calico','Orange','Medium']
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d78',
		title: 'Ninth Item',
		description: "This is the post's description. This is where you'll put details about the animal.",
		images: ['https://i.cbc.ca/1.5256404.1566499707!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/cat-behaviour.jpg','https://pyxis.nymag.com/v1/imgs/424/858/e6c66c3a1992e711bca0137b754fea749f-cat-law.rsquare.w700.jpg','https://images-na.ssl-images-amazon.com/images/I/71%2BmDoHG4mL.png'],
		cord: {lat:33.209953358934264,long:-87.5463168},
		tags: ['Cat','Calico','Orange','Medium']
	},
];

class Post extends React.Component {
// const Post = (props) => {
	// const [page, setPage] = useState(0); // defaults to the map
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

const renderPost = ({ item }) => (
	<Post description={item.description} title={item.title} images={item.images} cord={item.cord} tags={item.tags}/>
);

class TimeLine extends React.Component {
// const TimeLine = ({route, navigation}) => {
	state = {
		strayList:[],
		loaded:false,
	};

	componentDidMount() {
		if (this.state.loaded == false) {
			let tempVar = dbo.database.collection("FakeStrays");
			let DATA = [];
			tempVar.get().then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					DATA.push({...doc.data(),id:doc.id});
				});
				// console.log(querySnapshot);
				this.setState({strayList:DATA,loaded:true});
			});
		}
	}

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
			<View style={styles.window}>
				{/* <Pressable style={styles.toTop} onPress={toTop}></Pressable> */}
				<Pressable style={styles.toTop}></Pressable>
				<FlatList
					// ref={flatListRef}
					style={{width:screenWidth}}
					data={this.state.strayList}
					renderItem={renderPost}
					keyExtractor={post => post.id}
					numColumns={1}
					contentContainerStyle={styles.flatlist}
				/>
			</View>
		);
	}
}

export default TimeLine

const styles = StyleSheet.create({
	window: {
		width: '100%',
		flex: 6,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: theme.colors.background,
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