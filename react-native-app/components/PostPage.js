import React, {useState,  useCallback, Component} from 'react';
import { Text, Pressable, Button, View, navigation, StyleSheet, Image, ScrollView, TextInput, Appearance, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import * as MediaLibrary from 'expo-media-library';//THIS IS FOR PERMISSIONS
import DropDownPicker from 'react-native-dropdown-picker';

import ImageCarousel from './ImageCarousel';
import SimpleDropdownPicker from './DropdownPicker';
import { darkTheme, lightTheme } from './Themes';
const theme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme
const screenWidth = Dimensions.get('window').width;
import { collection, addDoc } from "firebase/firestore";

//const strayUploadsDB = collection(db, 'StraysFound');

MediaLibrary.requestPermissionsAsync();//working
const { navigate } = props.navigation;
function dropdownsandtextboxes(props){
/*
  const docRef = addDoc(collection(db, "StraysFound"), {
    Breed: breedValue,
    Color: colorValue,
    Size: sizeValue,
    type: typeValue
  });
  console.log("Document written with ID: ", docRef.id);
*/

  const submitFunction = () => {//this is the function that gets called when the button is pushed
    return(
        <Text style={{fontSize: 20}}>
          {'SUBMITTED'}
        </Text>
    );
  }
  const [text, onChangeText] = React.useState(null);// This is the additional details value 
  
  const ontypeOpen = useCallback(() => {
    setbreedOpen(false);
	setcolorOpen(false);
	setsizeOpen(false);
  }, []);

  const onbreedOpen = useCallback(() => {
    settypeOpen(false);
	setcolorOpen(false);
	setsizeOpen(false);
  }, []);
  const oncolorOpen = useCallback(() => {
    settypeOpen(false);
	setbreedOpen(false);
	setsizeOpen(false);
  }, []);
  const onsizeOpen = useCallback(() => {
    settypeOpen(false);
	setbreedOpen(false);
	setcolorOpen(false);
  }, []);
  return(<View style={[styles.container]}>
  <Pressable style = {[styles.button]} onPress={() => { navigate('ImageBrowser');}}>
        <Text style={{fontSize: 15, color:theme.colors.foreground}}> 
           {'Open Image Browser'}
        </Text>
  </Pressable>
  <SimpleDropdownPicker items = {[{label: 'Dog', value: 'Dog'}, {label: 'Cat', value: 'Cat'}]} title = 'Type' width = {82} priority = {10}/>
  <SimpleDropdownPicker items = {[{label: 'dog', value: 'dog'}, {label: 'cat', value: 'cat'}]} title = 'simple test' searchable = {true} width = {"100%"} priority = {9}/>
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
}

export default class PostPage extends Component {
  constructor (props){
    super(props)
    this.state = {photos: []}
  }

  componentDidUpdate() {
    const {params} = this.props.route;
    if (params) {
      const {photos} = params;
        if (photos) this.setState({photos}); 
        delete params.photos;
    }
  }
  render(){
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
		<View style={[styles.container]}>
      <ImageCarousel items = {this.state.photos}/>
      {dropdownsandtextboxes()}
			</View>
      </TouchableWithoutFeedback>
	);}
}


const styles = StyleSheet.create({
	input: {
    height: 80,
    width: "90%",
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  container: {
		alignContent: 'space-around',
		width: '100%',
		flex: 6,
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginLeft: 20,
		marginRight: 20,
	  },
    button: {
      backgroundColor:theme.colors.background,
      width: "50%",
      height: "8%",
      borderWidth: 1,
      borderColor:theme.colors.foreground,
      alignItems: 'center',
      paddingTop: "4%",
      marginLeft: "20%",
      marginRight: "20%"
    },
    buttonActive: {
      backgroundColor:theme.colors.background,
      width: "90%",
      height: "10%",
      borderWidth: 1,
      borderColor:theme.colors.foreground,
      alignItems: 'center',
      paddingTop: "4%",
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
      color: 'white'},
});