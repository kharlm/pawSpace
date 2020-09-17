import React from 'react';
import styles from '../../styles.js'
import styles1 from '../../styles1'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, SafeAreaView, TextInput, FlatList, Image, TouchableOpacity,Dimensions, TouchableWithoutFeedback } from 'react-native';
import db from '../../config/firebase';
import { getDog } from '../../actions/dog'
import DogInfo from '../DogInfo';
import Category from '../Category';
import { ScrollView } from 'react-native';
const  { width,height } = Dimensions.get('window');
import RNPickerSelect from 'react-native-picker-select';

class ColorCategory extends React.Component {
    constructor(props) {
        super(props);
          this.state = { 
              dogColor: ""
          }
      }
    render() {
        return (
            <ScrollView>
            
         
            <Text style={{fontWeight:"700",fontSize: 18,paddingTop: 5,paddingBottom: 10,paddingHorizontal: (width/4) + 5 }}>View Dogs By Breed</Text>
            <TouchableWithoutFeedback >
            <View style={{paddingHorizontal: (width/4),paddingTop: 5 }}>
           
            <View style={{justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
                height: 30,
                width: 140,
                borderRadius: 25,
                backgroundColor: '#5490fe',
                paddingTop: 5}}>
             <RNPickerSelect
             placeholder={{
              label: "View all Colors",
              color: 'red'
            }}
            onValueChange={(dogColor) => this.setState({dogColor})}
            onDonePress = {() => this.props.navigation.navigate('ColorPosts', {color: this.state.dogColor })}
           
            items={colors}
         />
          </View>
        
         </View>
         </TouchableWithoutFeedback >
            <View
                     style={{
                      flexDirection: "row",
                      padding: 10,
                      marginTop: 5,
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
            
            
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ColorPosts', {color: 'White' })}>
            <Category
               width={width}
               height={height}
               info ='White Dogs'
               infoImage ={require('../../assets/whitedog.jpeg')}
             />
             </TouchableOpacity>
   
             <TouchableOpacity onPress={() => this.props.navigation.navigate('ColorPosts', {color: 'Black' })}>
               <Category
               width={width}
               height={height}
               info ='Black Dogs'
               infoImage ={require('../../assets/blackdog.jpeg')}
             />
             </TouchableOpacity>
   
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ColorPosts', {color: 'Brown' })}>
               
               <Category
               width={width}
               height={height}
               info ='Brown Dogs'
               infoImage={require('../../assets/browndog.jpeg')}
             />
             </TouchableOpacity>
   
             <TouchableOpacity onPress={() => this.props.navigation.navigate('ColorPosts', {color: 'Red' })}>
               <Category
               width={width}
               height={height}
               info ='Red Dogs'
               infoImage={require('../../assets/reddog.jpeg')}
             />
             </TouchableOpacity>
             </View>
              </ScrollView>
       );
        }
       
}

let colors =[ {label: 'Apricot',value: 'Apricot'},
{label: 'Beige',value: 'Beige'},
{label: 'Black',value: 'Black'},
{label: 'Blue',value: 'Blue'},
{label: 'Brown',value: 'Brown'},
{label: 'Chesnut',value: 'Chesnut'},
{label: 'Cream',value: 'Cream'},
{label: 'Dark Blue',value: 'Dark Blue'},
{label: 'Dark Brown',value: 'Dark Brown'},
{label: 'Fawn',value: 'Fawn'},
{label: 'Gold',value: 'Gold'},
{label: 'Gray',value: 'Gray'},
{label: 'Light Brown',value: 'Light Brown'},
{label: 'Light Silver',value: 'Light Silver'},
{label: 'Lilac',value: 'Lilac'},
{label: 'Orange',value: 'Orange'},
{label: 'Red',value: 'Red'},
{label: 'Rust',value: 'Rust'},
{label: 'Silver',value: 'Silver'},
{label: 'Tan',value: 'Tan'},
{label: 'Wheaten',value: 'Wheaten'},
{label: 'White',value: 'White'},
{label: 'Yellow',value: 'Yellow'}]
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getDog }, dispatch)
  }
  
  const mapStateToProps = (state) => {
    return {
      user: state.user,
      dog: state.dog
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ColorCategory)