import React, {useState,  useCallback, Component} from 'react';
import { Text, Pressable, View, navigation,  StyleSheet, ScrollView, TextInput, Appearance, TouchableWithoutFeedback, Keyboard, Dimensions, LogBox } from 'react-native';
import * as MediaLibrary from 'expo-media-library';//THIS IS FOR PERMISSIONS
import DropDownPicker from 'react-native-dropdown-picker';
import dbo from './dataStorage';
import MapView, { Marker } from 'react-native-maps';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Modal from "react-native-modal";

import ImageCarousel from './ImageCarousel';
import SimpleDropdownPicker from './DropdownPicker';
import { darkTheme, lightTheme } from './Themes';
const theme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

MediaLibrary.requestPermissionsAsync();//working
export default class PostPage extends Component {
  constructor (props){
    super(props)
    this.state = {photos: [],
    text: null,
    title: null,
    typeOpen: false,
    types: [{label:'Dog', value:'Dog'},{label:'Cat', value:'Cat'}],
    typeValue: false,
    colorOpen: false,
    colorValue: [],
    Color: [{label: 'Brown', value: 'Brown'},
    {label: 'Tan', value: 'Tan'},
    {label: 'White', value: 'White'},
    {label: 'Black', value: 'Black'},
    {label: 'Orange', value: 'Orange'},
    {label: 'Grey', value: 'Grey'}],
    sizeOpen: false,
    sizeValue: false,
    Sizes: [{label: 'Toy', value: 'Toy'},
      {label: 'Small', value: 'Small'},
    {label: 'Medium', value: 'Medium'},
    {label: 'Large', value: 'Large'},
    {label: 'Huge', value: 'Huge'}],
    breedOpen: false,
    breedValue: [],
    Breeds: [{label: 'breed', value: null}],
    markerData: {
      latitude: 33.2083,
      longitude: -87.5504
  },
   locationButtonText: 'Select Location',
   submitButtontext: 'Submit',
   isModalVisible: false,
   isPosted:false,
   photoURLs: [],
  }
    this.onaddText = this.onaddText.bind(this);
    this.titleText = this.titleText.bind(this);
    this.setTypes = this.setTypes.bind(this);
    this.settypeValue = this.settypeValue.bind(this);
    this.settypeOpen = this.settypeOpen.bind(this);
    this.setcolorOpen = this.setcolorOpen.bind(this);
    this.setcolorValue = this.setcolorValue.bind(this);
    this.setColors = this.setColors.bind(this);
    this.setsizeOpen = this.setsizeOpen.bind(this);
    this.setSizes = this.setSizes.bind(this);
    this.setsizeValue = this.setsizeValue.bind(this);
    this.setbreedOpen = this.setbreedOpen.bind(this);
    this.setBreeds = this.setBreeds.bind(this);
    this.setbreedValue = this.setbreedValue.bind(this);
    this.setMarkerData = this.setMarkerData.bind(this);
    this.setIsModalVisible = this.setIsModalVisible.bind(this);
    this.setIsPosted = this.setIsPosted.bind(this);
    this.submitFunction = this.submitFunction.bind(this);
  }

  componentDidUpdate() {
    const {params} = this.props.route;
    if(params) {
      const {photos} = params;
      if (photos) {this.setState({photos}); 
      delete params.photos;}
    }
    if (params?.latitude) {
      // what it does: check if something has changed, update the state
      // why: if we always update the state, it will make an infinite loop
      if (params.latitude != this.state.markerData.latitude || params.longitude != this.state.markerData.longitude) {
          this.setMarkerData({
            latitude: params.latitude,
            longitude: params.longitude
        }); this.setLocationText("Location Saved!");params.markerData;
      }
  }
  }
  setLocationText(locationButtonText){
    this.setState({locationButtonText});
  }
  setIsModalVisible(isModalVisible){
    this.setState({isModalVisible});
  }
  setIsPosted(isPosted){
    this.setState({isPosted});
  }
  setSubmitText(submitButtonText){
    this.setState({submitButtonText});
  }
  componentDidMount(){LogBox.ignoreLogs(["VirtualizedLists should"], ["Setting a timer"]);}//this is to ignore a stupid warning
  onaddText(text) {
    this.setState({text});
  }
  titleText(title){
    this.setState({title});
  }

  /*readBreedsFromFile(){
    var fs = require('');
    var text = fs.readFileSync("./assets/DogList.txt", 'utf-8');
    var textByLine = text.split('\n');
    this.setState({Breeds: [{label: 'Dog', value: 'Dog'}]});
    while (textByLine){
      var breed = textByLine.pop();
    this.setState({ Breeds: [{label: breed, value: breed, parent: 'Dog'}, ...this.state.Breeds] })
  }
  text = fs.readFileSync("./assets/CatList.txt", 'utf-8');
  textByLine = text.split('\n');
  this.setState({Breeds: [...this.state.Breeds,{label: 'Cat', value: 'Cat'}]});
    while (textByLine){
      var breed = textByLine.pop();
    this.setState({ Breeds: [{label: breed, value: breed, parent: 'Cat'}, ...this.state.Breeds] })
  }
  }*/
  
  settypeOpen(typeOpen){
    this.setState({typeOpen});
  }
  setTypes(callback) {
    this.setState(state => ({
      types: callback(state.types)
    }));
  }

  settypeValue(callback) {
    this.setState(state => ({
      typeValue: callback(state.typeValue)
    }));
  }
  setcolorOpen(colorOpen){
    this.setState({colorOpen});
  }
  setColors(callback) {
    this.setState(state => ({
      Color: callback(state.Color)
    }));
  }

  setcolorValue(callback) {
    this.setState(state => ({
      colorValue: callback(state.colorValue)
    }));
  }
  setsizeOpen(sizeOpen){
    this.setState({sizeOpen});
  }
  setSizes(callback) {
    this.setState(state => ({
      Sizes: callback(state.Sizes)
    }));
  }

  setsizeValue(callback) {
    this.setState(state => ({
      sizeValue: callback(state.sizeValue)
    }));
  }
  setbreedOpen(breedOpen){
    this.setState({breedOpen});
  }
  setBreeds(callback) {
    this.setState(state => ({
      Breeds: callback(state.Breeds)
    }));
  }

  setbreedValue(callback) {
    this.setState(state => ({
      breedValue: callback(state.breedValue)
    }));
  }
  setMarkerData(markerData){
    this.setState({markerData});
  }
  submitFunction() {//this is the function that gets called when the button is pushed
		this.setIsModalVisible(true);
    var tagsList = [];
      tagsList = this.state.colorValue, //THIS HAS TO GO FIRST so that we don't get nested arrays
      tagsList.push(this.state.typeValue),
      //tagsList.push(this.state.breedValue), //Commented out until we figure out breed values
      tagsList.push(this.state.sizeValue),
      this.state.photos.map(image=>{dbo.firebase
        .storage()
        .ref(image)
        .putFile(image);
        dbo.firebase.storage().ref('/' + image)
          .getDownloadURL()
          .then((url) => {
            //from url you can fetched the uploaded image easily
            this.setState({photoURLs: url});
          })
          .catch((e) => console.log('getting downloadURL of image error => ', e));}
        );

      dbo.firebase.firestore()
           .collection('StraysFound')
           .add({
              description: this.state.text,
              title: this.state.title,
              tags: tagsList,
              id: 42, //Temp Data
              cord: {lat: this.state.markerData.latitude, long: this.state.markerData.longitude},
              images: this.state.photos, //TEMP DATA
           })
            .then(() => {
               console.log('Stray added!'); //TEST
              //  set posted true
                this.setIsPosted(true);
                setTimeout(function() {
                  //setDefaults();
                  setIsModalVisible(false);
                  this.setIsPosted(false);
                  // set psted false
                }, 750);
             }),
        this.setSubmitText( "SUBMITTED!");
  }
  
  render(){
    const { navigate } = this.props.navigation;
    var submitButtonText = "Submit";
  var carousel = null;
  if(this.state.photos.length){carousel = <ImageCarousel items = {this.state.photos}/>} 
	return (
    
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
      
		<ScrollView style={[styles.container]} contentContainerStyle={[styles.contentcontainer]} >
    {carousel}
      <Pressable style = {[styles.button]} onPress={() => { navigate('ImageBrowser');}}>
        <Text style={{fontSize: 15, color:theme.colors.foreground}}> 
           {'Open Image Browser'}
        </Text>
      </Pressable>
      <TextInput
      style={styles.titleStyle}
      multiline
      onChangeText={text=>this.titleText(text)}
      value={this.state.title}
      placeholder="Post Title"
    />
    <DropDownPicker
      open={this.state.typeOpen}
	    defaultNull
  	  placeholder = "Type"
      value={this.state.typeValue}
      items={this.state.types}
      setOpen={this.settypeOpen}
      setValue={this.settypeValue}
      setItems={this.setTypes}
	    containerStyle={{width:'23%',marginLeft: '5%',}}
	    zIndex={4000}
      zIndexInverse={1000}
    />
    <DropDownPicker
      open={this.state.colorOpen}
	    defaultNull
	    placeholder = "Colors"
      value={this.state.colorValue}
      items={this.state.Color}
      setOpen={this.setcolorOpen}
      setValue={this.setcolorValue}
      setItems={this.setColors}
	    multiple={true}
      min={0}
      max={6}
	    containerStyle={{width:'33%', margin: '2.2%',}}
	    zIndex={3000}
      zIndexInverse={1000}
    />
    <DropDownPicker
      open={this.state.sizeOpen}
	    defaultNull
	    placeholder = "Size"
      value={this.state.sizeValue}
      items={this.state.Sizes}
      setOpen={this.setsizeOpen}
      setValue={this.setsizeValue}
      setItems={this.setSizes}
	    containerStyle={{width:'29%',}}
	    zIndex={2000}
      zIndexInverse={1000}
    />
    <DropDownPicker
      open={this.state.breedOpen}
	    defaultNull
	    placeholder = "Breed"
	    searchable={true}
      value={this.state.breedValue}
      items={this.state.Breeds}
	    setOpen={this.setbreedOpen}
      setValue={this.setbreedValue}
	    containerStyle={{width:'60%', marginLeft: '20%', marginRight: '20%'}}
      setItems={this.setBreeds}
	    zIndex={1000}
      zIndexInverse={2000}
    />
      <TextInput
      style={styles.input}
      multiline
      numberOfLines={50}
      onChangeText={text=> this.onaddText(text)}
      value={this.state.text}
      placeholder='Additional details'
    />  
    <Pressable
      style={styles.button} onPress={() => {navigate('CustomGeolocation'); this.setLocationText('Saved Your Location!');}}>
        <Text style={styles.buttonText}>{this.state.locationButtonText}</Text>
    </Pressable>
    <Pressable onPress={this.submitFunction} style= {[styles.button]}>
    	<Text style={styles.buttonText}>{submitButtonText}
        </Text>
	</Pressable>
  <Modal isVisible={this.state.isModalVisible}>
			<View style={{ flex: 1, justifyContent:"center",alignItems:"center" }}>
				{!this.state.isPosted ? 
          <Text style={{fontSize:36,backgroundColor:'white',paddingHorizontal:10,paddingVertical:5,borderRadius:2,overflow:"hidden"}}>Submitting...</Text>
          : <Text style={{fontSize:36,backgroundColor:'white',paddingHorizontal:10,paddingVertical:5,borderRadius:2,overflow:"hidden"}}>Submitted!</Text>
        }
			</View>
		</Modal>
			</ScrollView>
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
    margin: '5%',
    backgroundColor: '#fff',
  },
  basicText: {
    fontSize: 12,
    padding: 10,
    color:'#000',
  },
  buttonText:{
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
  selectLocationButton:{
        backgroundColor:theme.colors.background,
        width: "90%",
        height: "10%",
        borderWidth: 1,
        borderColor:theme.colors.foreground,
        alignItems: 'center',
        paddingTop: "4%",
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
    backgroundColor: theme.colors.background,
	  },
    contentcontainer: {
      alignItems: 'center',
      flexDirection: 'row',
		  flexWrap: 'wrap',
      width: screenWidth,
    },
    titleStyle:{
      height: 50,
      width: "90%",
      borderWidth: 2,
      padding: 10,
      marginLeft: '5%',
      marginRight: '5%',
      backgroundColor: '#fff',
},
basicText: {
  fontSize: 12,
  padding: 10,
  color:'#000',
},
buttonText:{
    fontSize: 15,
    color:theme.colors.foreground,
},
    button: {
      backgroundColor:theme.colors.background,
      width: "50%",
      borderWidth: 1,
      marginTop:20,
      borderColor:theme.colors.foreground,
      alignItems: 'center',
      alignSelf: 'center',
      padding: "4%",
      marginLeft: "25%",
      marginRight: "25%",
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
