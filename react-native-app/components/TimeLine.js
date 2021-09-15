import React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';

const DATA = [
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'First Item',
		description: "This is the post's description. This is where you'll put details about the animal."
	},
	{
		id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
		title: 'Second Item',
		description: "This is the post's description. This is where you'll put details about the animal."
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d72',
		title: 'Third Item',
		description: "This is the post's description. This is where you'll put details about the animal."
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d73',
		title: 'Forth Item',
		description: "This is the post's description. This is where you'll put details about the animal."
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d74',
		title: 'Fifth Item',
		description: "This is the post's description. This is where you'll put details about the animal."
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d75',
		title: 'Sixth Item',
		description: "This is the post's description. This is where you'll put details about the animal."
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d76',
		title: 'Seventh Item',
		description: "This is the post's description. This is where you'll put details about the animal."
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d77',
		title: 'Eighth Item',
		description: "This is the post's description. This is where you'll put details about the animal."
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d78',
		title: 'Ninth Item',
		description: "This is the post's description. This is where you'll put details about the animal."
	},
];

const Post = ({ description, title }) => (
	// Maybe use horizontal flat list for photos
	<View style={styles.post}>
		<Text style={styles.title}> {title} </Text>
		<Text style={styles.description}>{description}</Text>
	</View>
);

const renderPost = ({ item }) => (
	<Post description={item.description} title={item.title} />
);

const TimeLine = (props) => {
	// notes for timeline render
	// * ScrollView loads all objects
	// * FlatList uses lazy rendering
	// * for section support (don't know what that is), use SectionList 
	return (
		<View style={props.windowStyle}>
			<FlatList
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
		width: '100%',
		flex: 1,
		// height: 100,
		backgroundColor: 'lightgrey',
		marginTop: 30,
		padding: 20,
		borderRadius: 15
	},
	title: {
		fontSize: 32,
		textDecorationLine: 'underline'
	},
	description: {
		fontSize: 24
	},
});