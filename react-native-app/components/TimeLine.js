import React from 'react';
import { Text, View, FlatList, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const DATA = [
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'First Item',
		description: "This is the post's description. This is where you'll put details about the animal.",
		images: ['https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2020/04/30/Pictures/_70e9d6ee-8af0-11ea-8bae-d48e751bd032.jpeg','https://i.cbc.ca/1.5256404.1566499707!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/cat-behaviour.jpg','https://pyxis.nymag.com/v1/imgs/424/858/e6c66c3a1992e711bca0137b754fea749f-cat-law.rsquare.w700.jpg','https://images-na.ssl-images-amazon.com/images/I/71%2BmDoHG4mL.png']
	},
	{
		id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
		title: 'Second Item',
		description: "This is the post's description. This is where you'll put details about the animal.",
		images: ['https://i.cbc.ca/1.5256404.1566499707!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/cat-behaviour.jpg','https://pyxis.nymag.com/v1/imgs/424/858/e6c66c3a1992e711bca0137b754fea749f-cat-law.rsquare.w700.jpg','https://images-na.ssl-images-amazon.com/images/I/71%2BmDoHG4mL.png']
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d72',
		title: 'Third Item',
		description: "This is the post's description. This is where you'll put details about the animal.",
		
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d73',
		title: 'Forth Item',
		description: "This is the post's description. This is where you'll put details about the animal.",
		images: ['https://pyxis.nymag.com/v1/imgs/424/858/e6c66c3a1992e711bca0137b754fea749f-cat-law.rsquare.w700.jpg','https://images-na.ssl-images-amazon.com/images/I/71%2BmDoHG4mL.png']
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d74',
		title: 'Fifth Item',
		description: "This is the post's description. This is where you'll put details about the animal.",
		images: ['https://images-na.ssl-images-amazon.com/images/I/71%2BmDoHG4mL.png']
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d75',
		title: 'Sixth Item',
		description: "This is the post's description. This is where you'll put details about the animal.",
		images: ['https://i.cbc.ca/1.5256404.1566499707!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/cat-behaviour.jpg','https://pyxis.nymag.com/v1/imgs/424/858/e6c66c3a1992e711bca0137b754fea749f-cat-law.rsquare.w700.jpg','https://images-na.ssl-images-amazon.com/images/I/71%2BmDoHG4mL.png']
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d76',
		title: 'Seventh Item',
		description: "This is the post's description. This is where you'll put details about the animal.",
		images: ['https://i.cbc.ca/1.5256404.1566499707!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/cat-behaviour.jpg','https://pyxis.nymag.com/v1/imgs/424/858/e6c66c3a1992e711bca0137b754fea749f-cat-law.rsquare.w700.jpg','https://images-na.ssl-images-amazon.com/images/I/71%2BmDoHG4mL.png']
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d77',
		title: 'Eighth Item',
		description: "This is the post's description. This is where you'll put details about the animal.",
		images: ['https://i.cbc.ca/1.5256404.1566499707!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/cat-behaviour.jpg','https://pyxis.nymag.com/v1/imgs/424/858/e6c66c3a1992e711bca0137b754fea749f-cat-law.rsquare.w700.jpg','https://images-na.ssl-images-amazon.com/images/I/71%2BmDoHG4mL.png']
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d78',
		title: 'Ninth Item',
		description: "This is the post's description. This is where you'll put details about the animal.",
		images: ['https://i.cbc.ca/1.5256404.1566499707!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/cat-behaviour.jpg','https://pyxis.nymag.com/v1/imgs/424/858/e6c66c3a1992e711bca0137b754fea749f-cat-law.rsquare.w700.jpg','https://images-na.ssl-images-amazon.com/images/I/71%2BmDoHG4mL.png']
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
		const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
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
								// number to best put this at
								scrollEventThrottle={10000}
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
				<Text style={styles.title}> {this.props.title} </Text>
				<Text style={styles.description}>{this.props.description}</Text>
			</View>
		)
	}
}

const renderPost = ({ item }) => (
	<Post description={item.description} title={item.title} images={item.images} />
);

const TimeLine = (props) => {
	// notes for timeline render
	// * ScrollView loads all objects
	// * FlatList uses lazy rendering
	// * for section support (don't know what that is), use SectionList 
	return (
		<View style={props.windowStyle}>
			<FlatList
				style={{width:screenWidth}}
				data={DATA}
				renderItem={renderPost}
				keyExtractor={post => post.id}
				numColumns={1}
				contentContainerStyle={styles.flatlist}
			/>
		</View>
	);
}

export default TimeLine

const styles = StyleSheet.create({
	flatlist: {
		// DO NOT SET FLEX TO 1
		// backgroundColor: 'blue',
	},
	post: {
		width: screenWidth,
		flex: 1,
		paddingBottom:20,
		overflow:'hidden'
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
	title: {
		fontSize: 32,
		textDecorationLine: 'underline',
		paddingTop:10,
		color:'white'
	},
	description: {
		fontSize: 24,
		paddingHorizontal:20,
		paddingBottom:10,
		color:'white'
	},
});