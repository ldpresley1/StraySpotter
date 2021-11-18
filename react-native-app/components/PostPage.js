import React, { Component} from 'react';
import { Text, Pressable, View, navigation,  StyleSheet, ScrollView, TextInput, Appearance, TouchableWithoutFeedback, Keyboard, Dimensions, LogBox } from 'react-native';
import * as MediaLibrary from 'expo-media-library';//THIS IS FOR PERMISSIONS
import DropDownPicker from 'react-native-dropdown-picker';
import dbo from './dataStorage';
import ImageCarousel from './ImageCarousel';
import SimpleDropdownPicker from './DropdownPicker';
import { darkTheme, lightTheme } from './Themes';
import LoadingModal from './LoadingModal';
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
    markerData: {
      latitude: 33.2083,
      longitude: -87.5504
  },
   locationButtonText: 'Select Location',
   submitButtontext: 'Submit',
  }
  
  this.baseState = this.state;
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
    this.setMarkerData = this.setMarkerData.bind(this);
    this.submitFunction = this.submitFunction.bind(this);
    this.imageIDMaker = this.imageIDMaker.bind(this);
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
  setMarkerData(markerData){
    this.setState({markerData});
  }
  imageIDMaker(text, array){
    for(var i = 0; i < array.length; i++){
        if(array.length - 1 == i)
            text = text + "and " + array[i]
        else if (array.length > 2)
            text = text + array[i] + ", ";
        else
            text = text + array[i] + " ";
    }
    text = text + " fur."
    return text;
  }
  async uploadImageAsync(filename,uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    const fileRef = dbo.firebase.storage().ref(filename);
    const result = await fileRef.put(blob);
    const url = await fileRef.getDownloadURL();
    // We're done with the blob, close and release it
    blob.close();
  
    return url;
  }
  async submitFunction() {//this is the function that gets called when the button is pushed
		//this.setIsModalVisible(true);
    var imageDescription = "This post is a " + this.state.sizeValue + " " + this.state.typeValue + " with ",
      imageDescription = this.imageIDMaker(imageDescription, this.state.colorValue);
      var tagsList = [];
      tagsList = this.state.colorValue; //THIS HAS TO GO FIRST so that we don't get nested arrays
      tagsList.push(this.state.typeValue);
      tagsList.push(this.state.sizeValue);
      var photoURLs = [];
      for(let i = 0; i< this.state.photos.length; i++){
      photoURLs.push( await this.uploadImageAsync(this.state.photos[i].name, this.state.photos[i].uri));}
      


      dbo.firebase.firestore()
           .collection('StraysFound')
           .add({
              description: this.state.text,
              title: this.state.title,
              tags: tagsList,
              cord: {lat: this.state.markerData.latitude, long: this.state.markerData.longitude},
              images: photoURLs, 
              flag: false,
              userID: dbo.firebase.auth().currentUser.uid,
              imageID: imageDescription,
           });
             const {navigate} = this.props.navigation;
             this.setState(this.baseState);
             navigate('TimeLine');
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
    <Text></Text>
    <TextInput
      style={styles.titleStyle}
      multiline
      onChangeText={text=>this.titleText(text)}
      value={this.state.title}
      paddingTop = {10}
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
      <TextInput
      style={styles.input}
      multiline
      numberOfLines={50}
      onChangeText={text=> this.onaddText(text)}
      value={this.state.text}
      placeholder='Additional details'
    />
    <Pressable style = {[styles.button]} onPress={() => { navigate('ImageBrowser');}}>
    <Text style={{fontSize: 15, color:theme.colors.foreground}}>
       {'Open Image Browser'}
    </Text>
    </Pressable>
    <Pressable
      style={styles.button} onPress={() => {navigate('CustomGeolocation'); this.setLocationText('Saved Your Location!');}}>
        <Text style={styles.buttonText}>{this.state.locationButtonText}</Text>
    </Pressable>
    <Pressable onPress={this.submitFunction} style= {[styles.button]}>
    	<Text style={styles.buttonText}>{submitButtonText}
        </Text>
	</Pressable>
    <LoadingModal isVisible={false}/>
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
