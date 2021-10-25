import React, {useState,  useCallback, Component} from 'react';
import { Text, Pressable, Button, View, navigation, StyleSheet, ScrollView, TextInput, Appearance, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import * as MediaLibrary from 'expo-media-library';//THIS IS FOR PERMISSIONS
import DropDownPicker from 'react-native-dropdown-picker';

import ImageCarousel from './ImageCarousel';
import SimpleDropdownPicker from './DropdownPicker';
import { darkTheme, lightTheme } from './Themes';
const theme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import { collection, addDoc } from "firebase/firestore";

//const strayUploadsDB = collection(db, 'StraysFound');

MediaLibrary.requestPermissionsAsync();//working
/*const { navigate } = props.navigation;
  return(<View style={[styles.container]}>

   <TextInput
      style={styles.input}
      multiline
      numberOfLines={50}
      onChangeText={onChangeText}
      value={text}
      placeholder='Additional details'
    />  
    <Pressable onPress={submitFunction} style= {[styles.buttonActive]}>
      <Text style={{fontSize: 20, color:theme.colors.foreground}}> 
      {'Submit'}
      </Text> 
  </Pressable>
    </View>);
}*/

export default class PostPage extends Component {
  constructor (props){
    super(props)
    this.state = {photos: [],
    text: null}
    this.onChangeText = this.onChangeText.bind(this);
  }

  componentDidUpdate() {
    const {params} = this.props.route;
    if (params) {
      const {photos} = params;
        if (photos) this.setState({photos}); 
        delete params.photos;
    }
  }
  onChangeText(callback) {
    this.setState(state => ({
      text: callback(state.text)
    }));
  }

  checkForPhotos =()=>{
    if(this.state.photos.length){return(true);}
    else{return(false);}
  }
  render(){
    const { navigate } = this.props.navigation;
  
  
    var carousel = this.checkForPhotos ? <ImageCarousel items = {this.state.photos}/> : null;
	return (
    
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
		<View style={[styles.container]}>
      {carousel}
      <Pressable style = {[styles.button]} onPress={() => { navigate('ImageBrowser');}}>
        <Text style={{fontSize: 15, color:theme.colors.foreground}}> 
           {'Open Image Browser'}
        </Text>
      </Pressable>

      <TextInput
      style={styles.input}
      multiline
      numberOfLines={50}
      onChangeText={this.onChangeText}
      value={this.state.text}
      placeholder='Additional details'
    />  
    <Pressable onPress={console.log('pressed')} style= {[styles.buttonActive]}>
      <Text style={{fontSize: 20, color:theme.colors.foreground}}> 
      {'Submit'}
      </Text> 
     </Pressable>
			</View>
      </TouchableWithoutFeedback>
	);}
}


const styles = StyleSheet.create({
	input: {
    height: 100,
    width: "90%",
    borderWidth: 1,
    alignSelf: 'center',
    padding: 10,
    margin: 20,
    backgroundColor: '#fff',
  },
  container: {
		alignContent: 'space-around',
		width: '100%',
		flex: 6,
		flexDirection: 'row',
		flexWrap: 'wrap',
    backgroundColor: theme.colors.background,
	  },
    carouselcontainer: {
      alignItems: 'flex-start',
      height: screenWidth,
    },
    button: {
      backgroundColor:theme.colors.background,
      width: "50%",
      height: "8%",
      borderWidth: 1,
      marginTop:20,
      borderColor:theme.colors.foreground,
      alignItems: 'center',
      alignSelf: 'center',
      paddingTop: "4%",
      marginLeft: "20%",
      marginRight: "20%"
    },
    buttonActive: {
      backgroundColor:theme.colors.background,
      width: "90%",
      height: "10%",
      borderWidth: 1,
      alignSelf: 'center',
      borderColor:theme.colors.foreground,
      alignItems: 'center',
      paddingTop: "4%",
    },
  
});