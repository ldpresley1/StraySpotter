import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView } from 'react-native';
const screenWidth = Dimensions.get('window').width;

//TO USE ME IMPORT THEN <ImageCarousel items= {photos}/> add timeline={true} for the timeline page as they are ever so slightly

export default class ImageCarousel extends Component {
    constructor (props) {
        super(props)
        this.state = {
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
		if(this.props.timeline) {
        return(
			<View>
			{
				this.props.items ?
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
									this.props.items.map((imageUrl, index) => {
										return <Image 
											key={index} 
											style={styles.postImage} 
											source={{uri: imageUrl}} />
									})
								}
							</ScrollView>
							{
								this.props.items.length > 1 ? 
								<View style={styles.paging}>
									{
										this.props.items.map((imageUrl, index) => {
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
		</View> 
        );
	}
	else{return(
		<View>
		{
			this.props.items ?
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
								this.props.items.map((imageUrl, index) => {
									return <Image 
										key={index} 
										style={styles.postImage} 
										source={{uri: imageUrl.uri}} />
								})
							}
						</ScrollView>
						{
							this.props.items.length > 1 ? 
							<View style={styles.paging}>
								{
									this.props.items.map((imageUrl, index) => {
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
	</View> 
	);}

    }


}


const styles = StyleSheet.create({
scrollViewContainer: {
    height: screenWidth,
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