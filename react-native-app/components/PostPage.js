import React, {useState, useMemo, useCallback} from 'react';
import { Text, Pressable, View, StyleSheet, TextInput, Appearance, TouchableWithoutFeedback, Keyboard } from 'react-native';
//import { ImageBrowser } from 'expo-image-picker-multiple';
//import * as MediaLibrary from 'expo-media-library';
import DropDownPicker from 'react-native-dropdown-picker';
import dbo from './dataStorage';
import MapView, { Marker } from 'react-native-maps';

import { darkTheme, lightTheme } from './Themes';
const theme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme

//MediaLibrary.requestPermissionsAsync();

var tagsList = [];
const PostPage = ({route, navigation}) => {
const [types, setTypes] = useState([//might move the longer lists into text files for clarity
  {label: 'Dog', value: 'Dog'},
  {label: 'Cat', value: 'Cat'}
]);
const [Breeds, setBreeds] = useState([
	{label: 'figure out how to switch between', value: 'apple'},
	{label: 'Cat and dog breeds', value: 'banana'}
  ]);
  const [Color, setColors] = useState([
	{label: 'Brown', value: 'Brown'},
	{label: 'Tan', value: 'Tan'},
	{label: 'White', value: 'White'},
	{label: 'Black', value: 'Black'},
	{label: 'Orange', value: 'Orange'},
	{label: 'Grey', value: 'Grey'}
  ]);
  const [Sizes, setSizes] = useState([
	{label: 'Small', value: 'Small'},
	{label: 'Medium', value: 'Medium'},
	{label: 'Large', value: 'Large'},
	{label: 'Huge', value: 'Huge'}
  ]);
  const [typeOpen, settypeOpen] = useState(false);
  const [breedOpen, setbreedOpen] = useState(false);
  const [colorOpen, setcolorOpen] = useState(false);
  const [sizeOpen, setsizeOpen] = useState(false);

  const[typeValue, settypeValue] = useState(null);//These are the values for the dropdowns theyre contained 
  const[breedValue, setbreedValue] = useState(null);
  const[colorValue, setcolorValue] = useState([]);
  const[sizeValue, setsizeValue] = useState(null);

  const [text, onChangeText] = React.useState(null);// This is the additional details value
  const [title, titleText] = React.useState(null);
  const [location, locationText] = React.useState(null);
  const [locationButton, locationButtonInfo] = React.useState(null);



  const submitFunction = () => {//this is the function that gets called when the button is pushed
    return(
      tagsList = colorValue, //THIS HAS TO GO FIRST so that we don't get nested arrays
      tagsList.push(typeValue),
      tagsList.push(breedValue),
      tagsList.push(sizeValue),
      //console.log(tagsList), //TEST

      dbo.firebase.firestore()
           .collection('StraysFound')
           .add({
              Breed: breedValue,
              Color: colorValue,
              Size: sizeValue,
              Type: typeValue,
              Description: text,
              Title: title,
              Tags: tagsList

           })
            .then(() => {
               console.log('Stray added!'); //TEST
             }),
        tagsList = [],

        <Text style={{fontSize: 20}}>
          {"SUBMITTED"}
        </Text>
    );
  }
  //const widgetSettings = useMemo(
    //() => ({
      //  getImageMetaData: false,
        //initialLoad: 100,
        //assetsType: [MediaType.photo, MediaType.video],
        //minSelection: 1,
        //maxSelection: 3,
        //portraitCols: 4,
        //landscapeCols: 4,
    //}),
    //[]
//)
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
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
		<View style={[styles.container]}>
		<>
   <TextInput
      style={styles.titleStyle}
      multiline
      onChangeText={titleText}
      value={title}
      placeholder="Post Title"
    />
	<DropDownPicker
      open={typeOpen}
	  onOpen={ontypeOpen}
	  defaultNull
	  placeholder = "Type"
      value={typeValue}
      items={types}
      setOpen={settypeOpen}
      setValue={settypeValue}
      setItems={setTypes}
	  containerStyle={{width:90}}
	  zIndex={4000}
      zIndexInverse={1000}
    />
	<DropDownPicker
      open={colorOpen}
	  onOpen={oncolorOpen}
	  defaultNull
	  placeholder = "Colors"
      value={colorValue}
      items={Color}
      setOpen={setcolorOpen}
      setValue={setcolorValue}
      setItems={setColors}
	  multiple={true}
      min={0}
      max={6}
	  containerStyle={{width:125}}
	  zIndex={3000}
      zIndexInverse={1000}
    />
	<DropDownPicker
      open={sizeOpen}
	  onOpen={onsizeOpen}
	  defaultNull
	  placeholder = "Size"
      value={sizeValue}
      items={Sizes}
      setOpen={setsizeOpen}
      setValue={setsizeValue}
      setItems={setSizes}
	  containerStyle={{width:93}}
	  zIndex={2000}
      zIndexInverse={1000}
    />
     <DropDownPicker
      open={breedOpen}
	  onOpen={onbreedOpen}
	  defaultNull
	  placeholder = "Breed"
	  searchable={true}
      value={breedValue}
      items={Breeds}
	  setOpen={setbreedOpen}
      setValue={setbreedValue}
	  //disabled={true}
	  disabledStyle={{opacity:0}}
	  containerStyle={{width:200}}
      setItems={setBreeds}
	  zIndex={1000}
      zIndexInverse={2000}
    />
     <TextInput
        style={styles.input}
        multiline
        numberOfLines={50}
        onChangeText={onChangeText}
        value={text}
        placeholder="Additional details"
      />
    <Pressable
      style={styles.button} onPress={() => navigation.navigate('CustomGeo')}>
        <Text style={styles.basicText}>Select Location</Text>
    </Pressable>
      <Pressable onPress={submitFunction} style= {[styles.button]}>
				<Text style={{fontSize: 20, color:theme.colors.foreground}}> 
        {'Submit'}
        </Text> 
		</Pressable>
            </>
			</View>
      </TouchableWithoutFeedback>
	);
}

export default PostPage;

const styles = StyleSheet.create({
	input: {
    height: 80,
    width: "90%",
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  basicText: {
    fontSize: 15,
    color:theme.colors.foreground,
  },
  titleStyle:{
        height: 50,
        width: "90%",
        borderWidth: 2,
        padding: 10,
        backgroundColor: '#fff',
  },
  locationStyle:{
          height: 50,
          width: "55%",
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
      width: "90%",
      height: "10%",
      borderWidth: 1,
      borderColor:theme.colors.foreground,
      alignItems: 'center',
      paddingTop: "4%",
    },
    buttonActive: {
      backgroundColor:theme.colors.foreground, // the rest of button is the same
      flex: 1,
      borderTopWidth: 1,
      borderColor:theme.colors.foreground,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: (Platform.OS === 'ios') ? 20 : 15,
      paddingBottom: (Platform.OS === 'ios') ? 0 : 0,
    },
});