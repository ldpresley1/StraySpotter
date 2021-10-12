import React, {useState,  useCallback} from 'react';
import { Text, Pressable, Button, View, StyleSheet, Image, ScrollView, TextInput, Appearance, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ImageBrowser } from 'expo-image-picker-multiple';
import * as MediaLibrary from 'expo-media-library';//THIS IS FOR PERMISSIONS
import DropDownPicker from 'react-native-dropdown-picker';

import { darkTheme, lightTheme } from './Themes';
const theme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme

import { collection, addDoc } from "firebase/firestore";

//const strayUploadsDB = collection(db, 'StraysFound');

MediaLibrary.requestPermissionsAsync();//working
const PostPage = (props) => {
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

/*
  const docRef = addDoc(collection(db, "StraysFound"), {
    Breed: breedValue,
    Color: colorValue,
    Size: sizeValue,
    type: typeValue
  });
  console.log("Document written with ID: ", docRef.id);
*/
const { navigate } = props.navigation;
  const [text, onChangeText] = React.useState(null);// This is the additional details value 

  const submitFunction = () => {//this is the function that gets called when the button is pushed
    return(
        <Text style={{fontSize: 20}}>
          {"SUBMITTED"}
        </Text>
    );
  }
 
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
    <Pressable style = {[styles.button]} onPress={() => { navigate('ImageBrowser'); }}>
          <Text style={{fontSize: 15, color:theme.colors.foreground}}> 
             {'Open Image Browser'}
          </Text>
    </Pressable>
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
	  containerStyle={{width:82}}
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
      <Pressable onPress={submitFunction} style= {[styles.buttonActive]}>
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
});