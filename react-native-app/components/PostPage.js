import React, {useState, useMemo, useCallback} from 'react';
import { Text, Pressable, View, StyleSheet, TextInput, Appearance, TouchableWithoutFeedback, Keyboard } from 'react-native';
//import { ImageBrowser } from 'expo-image-picker-multiple';
//import * as MediaLibrary from 'expo-media-library';
import DropDownPicker from 'react-native-dropdown-picker';
import dbo from './dataStorage';
import MapView, { Marker } from 'react-native-maps';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Modal from "react-native-modal";

import { darkTheme, lightTheme } from './Themes';
const theme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme

//MediaLibrary.requestPermissionsAsync();

var tagsList = [];
var locationButtonText = "Select Location";
var submitButtonText = "Submit";
const PostPage = ({route, navigation}) => {


const [markerData,setMarkerData] = useState({
    latitude: 33.2083,
    longitude: -87.5504
});

if (route.params?.latitude) {
    // what it does: check if something has changed, update the state
    // why: if we always update the state, it will make an infinite loop
    if (route.params.latitude != markerData.latitude || route.params.longitude != markerData.longitude) {
        setMarkerData({
            latitude: route.params.latitude,
            longitude: route.params.longitude
        });
    }
}

const [types, setTypes] = useState([//might move the longer lists into text files for clarity
  {label: 'Dog', value: 'Dog'},
  {label: 'Cat', value: 'Cat'}
]);
  const[Breeds, setBreeds] = useState([
   {label: 'please select type first', value: 'temp'}
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
  const [colorOpen, setcolorOpen] = useState(false);
  const [sizeOpen, setsizeOpen] = useState(false);

  const[typeValue, settypeValue] = useState(null);//These are the values for the dropdowns theyre contained
  const[colorValue, setcolorValue] = useState([]);
  const[sizeValue, setsizeValue] = useState(null);

  const [text, onChangeText] = React.useState(null);// This is the additional details value
  const [title, titleText] = React.useState(null);
  const [location, locationText] = React.useState(null);
  const [locationButton, locationButtonInfo] = React.useState(null);


  const [breedOpen, setbreedOpen] = useState(false);
  const[breedValue, setbreedValue] = useState(null);

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isPosted, setIsPosted] = React.useState(false);

  const setDefaults = () => {
    onChangeText('');
    titleText('');
    settypeValue(null);
    setcolorValue([]);
    setsizeValue(null);
  }

  const submitFunction = () => {//this is the function that gets called when the button is pushed
		setIsModalVisible(true);
    return(
      tagsList = colorValue, //THIS HAS TO GO FIRST so that we don't get nested arrays
      tagsList.push(typeValue),
      //tagsList.push(breedValue), //Commented out until we figure out breed values
      tagsList.push(sizeValue),

      dbo.firebase.firestore()
           .collection('StraysFound')
           .add({
              description: text,
              title: title,
              tags: tagsList,
              flag: false, //set to false unless reported on the timeline page
              id: 42, //Temp Data
              cord: {lat: markerData.latitude, long: markerData.longitude},
              images: ["https://drive.google.com/uc?export=view&id=1t71FPVZGB5jPaynUaQ8wYXwlnc1pTdK0", "https://drive.google.com/uc?export=view&id=1qNcYmOapTKTs2eARJCa6hOvFijK5ykll"], //TEMP DATA
              userID: 42, //temp data
           })
            .then(() => {
               console.log('Stray added!'); //TEST
              //  set posted true
                setIsPosted(true);
                setTimeout(function() {
                  setDefaults();
                  setIsModalVisible(false);
                  setIsPosted(false);
                  // set psted false
                }, 750);
             }),
        emptyArray(tagsList),
        submitButtonText = "SUBMITTED!",
        <Text style={{fontSize: 20}}>
          {"SUBMITTED"}
        </Text>
    );
  }

  function emptyArray(array){
    while(array.length > 0)
        array.pop();
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

	const practiceModal = () => {
    // show modal
		setIsModalVisible(true);

    // push data
		setTimeout(function() {
      // data is posted

      // display data has been posted
      setIsPosted(true);

      setTimeout(function(){
        setDefaults();
        setIsModalVisible(false);
        setIsPosted(false);
      }, 750);
		}, 3000);
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
		<View style={[styles.container]}>
		<>
   <TextInput
      style={styles.titleStyle}
      multiline
      maxLength = {15}
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
        <Text style={styles.buttonText}>{locationButtonText}</Text>
    </Pressable>
   <Text style={styles.basicText}>Lat: {markerData.latitude}</Text>
   <Text style={styles.basicText}>Long: {markerData.longitude}</Text>
    <Pressable onPress={submitFunction} style= {[styles.button]}>
    	<Text style={styles.buttonText}>{submitButtonText}</Text>
	</Pressable>

		<Modal isVisible={isModalVisible}>
			<View style={{ flex: 1, justifyContent:"center",alignItems:"center" }}>
				{!isPosted ?
          <Text style={{fontSize:36,backgroundColor:'white',paddingHorizontal:10,paddingVertical:5,borderRadius:2,overflow:"hidden"}}>Submitting...</Text>
          : <Text style={{fontSize:36,backgroundColor:'white',paddingHorizontal:10,paddingVertical:5,borderRadius:2,overflow:"hidden"}}>Submitted!</Text>
        }
			</View>
		</Modal>
    </>
    </View>
    </TouchableWithoutFeedback>
	);
}

//Custom location grabber
const CustomGeolocation = (props) => {
	const [mapRegion, setMapRegion] = useState({
		latitude: 33.2083,
		longitude: -87.5504,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});

	const [markerData, setMarkerData] = useState({
		latitude: 33.2083,
		longitude: -87.5504
	});

	return (
		<View style={styles.window}>
			<MapView
				style={{ alignSelf: 'stretch', height: '100%' }}
				region={mapRegion}

				// if you don't do this, the placing of the marker will
				// re-render everything and change the region back to original
				onRegionChangeComplete={(region) => {setMapRegion(region)}}
				showsUserLocation = {true}
				// super buggy if rotate is on
				rotateEnabled={false}
				onPress={(e) => {setMarkerData(e.nativeEvent.coordinate)}} >

				<Marker
					coordinate={{latitude: markerData.latitude, longitude: markerData.longitude}}
					draggable
					onDragEnd={(e) => {setMarkerData(e.nativeEvent.coordinate)}}
				>
				</Marker>
			</MapView>
			<Pressable style={styles.mapButton} onPress={() => {
					props.navigation.navigate('Uploads', markerData);
					locationButtonText = "Location Saved!";
				}}>
				{/* there is no cancel */}
				<Text style={styles.buttonText}>Save Location</Text>
			</Pressable>
		</View>
	);
}

const Stack = createNativeStackNavigator();

function App() {
	return (
		<Stack.Navigator screenOptions={{headerShown:false}}>
			<Stack.Screen name="Uploads" component={PostPage} />
			<Stack.Screen name="CustomGeo" component={CustomGeolocation} />
		</Stack.Navigator>
	);
}

export default App;

const styles = StyleSheet.create({
	input: {
    height: 80,
    width: "90%",
    borderWidth: 1,
    padding: 10,
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
		marginLeft: 20,
		marginRight: 20,
	  },
    mapButton: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius:2,
        backgroundColor:theme.colors.primary,
        position:'absolute',
        marginLeft: 125,
        bottom: 20,
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
      paddingTop: 15,
      paddingBottom: 0,
    },
});