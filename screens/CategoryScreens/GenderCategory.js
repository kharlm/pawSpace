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

class GenderCategory extends React.Component {
    constructor(props) {
        super(props);
          this.state = { 
              dogGender: ""
          }
      }
    render() {
        return (
            <ScrollView>
            
         
            <Text style={{fontWeight:"700",fontSize: 18,paddingTop: 5,paddingBottom: 10,paddingHorizontal: (width/4) + 5 }}>View Dogs By Gender</Text>
            <TouchableWithoutFeedback >
            <View style={{paddingHorizontal: (width/4),paddingTop: 5 }}>
        
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
            
            
            <TouchableOpacity onPress={() => this.props.navigation.navigate('GenderPosts', {gender: 'Male' })}>
            <Category
               width={width}
               height={height}
               info ='Male Dogs'
               infoImage ={require('../../assets/maledog.jpeg')}
             />
             </TouchableOpacity>
   
             <TouchableOpacity onPress={() => this.props.navigation.navigate('GenderPosts', {gender: 'Female' })}>
               <Category
               width={width}
               height={height}
               info ='Female Dogs'
               infoImage ={require('../../assets/femaledog.jpeg')}
             />
             </TouchableOpacity>
   
             </View>
              </ScrollView>
       );
        }
       
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getDog }, dispatch)
  }
  
  const mapStateToProps = (state) => {
    return {
      user: state.user,
      dog: state.dog
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(GenderCategory)