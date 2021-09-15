import React, {useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


const PostPage = (props) => {
	const [open, setOpen] = useState(false);
const [value, setValue] = useState(null);
const [types, setTypes] = useState([
  {label: 'Dog', value: 'Dog'},
  {label: 'Cat', value: 'Cat'}
]);
const [Breeds, setBreeds] = useState([
	{label: 'figure out how to switch between', value: 'apple'},
	{label: 'Cat and dog breeds', value: 'banana'}
  ]);
	return (
		
		<View style={[props.windowStyle, styles.container]}>
		<>
		<DropDownPicker
      open={open}
	  defaultNull
	  placeholder = "Type"
      value={value}
      items={types}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setTypes}
	  containerStyle={{ width: 82, height: 100}}
    />
           <DropDownPicker
      open={open}
	  defaultNull
	  placeholder = "Breed"
	  searchable={true}
      value={value}
      items={Breeds}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setBreeds}
	  containerStyle={{ width: 120, height: 60}}
    />     
            </>
			</View>
	);
}

export default PostPage;

const styles = StyleSheet.create({
	container: {
		//width,
		height: 0
	  },
});