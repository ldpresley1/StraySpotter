import React, {useState} from 'react';
import { Icon, } from 'react-native-elements';
import { StyleSheet, Text, View, Pressable, TextInput, Appearance } from 'react-native';
import { darkTheme, lightTheme } from './Themes';

const theme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme;

export default function SecureInput(props) {
	const [isVisible, setIsVisible] = useState(false);

	return (<>
		<Text style={styles.inputLabel}>{props.label}</Text>
		<View style={styles.textInputView}>
			<TextInput
				style={styles.textInput}
				onChangeText={props.onChange}
				placeholder={props.placeholder}
				value={props.val}
				autoCapitalize='none'
				autoCorrect={false}
				secureTextEntry={!isVisible} />
			<Pressable style={styles.showPasswordButton} onPress={() => setIsVisible(!isVisible)} >
				<Icon name={isVisible ? "eye-with-line" : "eye"} type="entypo" color={theme.colors.foreground} />
			</Pressable>
		</View>
	</>);
}

const styles = StyleSheet.create({
	inputLabel: {
		color:theme.colors.foreground,
		fontWeight:'bold',
		fontSize:24,
		alignSelf:'flex-start',
		
		marginLeft:theme.spacing.l,
		marginTop:theme.spacing.s,
	},
	textInputView: {
		marginBottom:theme.spacing.s,
		width:'100%',
		alignItems:'center',
	},
	textInput: {
		width:'90%',
		borderRadius:10,
		borderColor:theme.colors.foreground,
		color:theme.colors.foreground,
		borderWidth:1,
		paddingVertical:theme.spacing.l,
		paddingLeft: theme.spacing.l,
	},
	showPasswordButton: {
		height:'100%',
		position:'absolute',
		top:0,
		right:'10%',
		justifyContent:'center',
	},
});