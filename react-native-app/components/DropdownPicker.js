import DropDownPicker from 'react-native-dropdown-picker';
import React, {useState, useCallback, Component} from 'react';
//shelving this until i can figure out how to make it work with the database 
//will display but how do I push the value to the database afterwards?
//this is like the third iteration

export default class SimpleDropdownPicker extends Component{
    constructor(props){
        super(props);

        this.state = {
            open: false,
            Value: null,
            items: [...this.props.items]
        };
        this.setValue = this.setValue.bind(this);
        this.setOpen = this.setOpen.bind(this);
        this.setItems = this.setItems.bind(this);
    }
      setOpen(open) {
        this.setState({open});
      }
    
      setValue(callback) {
        this.setState(state => ({
          Value: callback(state.Value)
        }));
      }
    
      setItems(callback) {
        this.setState(state => ({
          items: callback(state.items)
        }));
      }
    
      render() {
        const { open, Value, items } = this.state;
        if (this.props.multiple){
        return(
            <DropDownPicker
                open={open}
	            //onopen={onopen}
	            defaultNull
	            placeholder = {this.props.title}
                value={Value}
                items={items}
                searchable = {this.props.searchable}
                multiple = {true}
                min = {this.props.min}
                max = {this.props.max}
                setOpen={this.setOpen}
                setValue={this.setValue}
                setItems={this.setItems}
	            containerStyle={{width: this.props.width}}
                zIndex={this.props.priority}
            />  
        );}
        else {
            return(
                <DropDownPicker
                    open={open}
                    //onopen={onopen}
                    defaultNull
                    placeholder = {this.props.title}
                    value={Value}
                    items={items}
                    searchable = {this.props.searchable}
                    setOpen={this.setOpen}
                    setValue={this.setValue}
                    setItems={this.setItems}
                    containerStyle={{width: this.props.width}}
                    zIndex={this.props.priority}
                    onChangeValue={(Value) => {return(Value);}}
                />  
            );
        }
    }
}