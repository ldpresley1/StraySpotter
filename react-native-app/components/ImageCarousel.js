import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView } from 'react-native';
const screenWidth = Dimensions.get('window').width;
export default class ImageCarousel extends Component {
    constructor (props) {
        super(props)
        this.state = {
          photos: [...props.items],
          page: 0
        }
      }

	change = ({nativeEvent}) => {
		const slide = Math.ceil((nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)-.5);
		if (slide != this.state.page) {
			this.setState({page:slide});
		}
	}

    render(){

        return(
            <View style={styles.scrollViewContainer}>
							<ScrollView 
								style={styles.imageScroller} 
								pagingEnabled horizontal 
								showsHorizontalScrollIndicator={false}

								scrollEventThrottle={64}
								onScroll={this.change}>
								{
									this.state.photos.map((imageUrl, index) => {
										return <Image 
											key={index} 
											style={styles.postImage} 
											source={{uri: imageUrl}} />
									})
								}
							</ScrollView>
							{
								this.state.photos.length > 1 ? 
								<View style={styles.paging}>
									{
										this.state.photos.map((imageUrl, index) => {
											return <Text key={index} style={this.state.page == index ? styles.pagingTextActive : styles.pagingText}>{'\u2B24'}</Text>
										})
									}
								</View> :
								<></>
							}
						</View>
        );

    }


}


const styles = StyleSheet.create({
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
});