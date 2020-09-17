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

class AgeCategory extends React.Component {
    constructor(props) {
        super(props);
          this.state = { 
              dogAge: ""
          }
      }
    render() {
        return (
            <ScrollView>
            
         
            <Text style={{fontWeight:"700",fontSize: 18,paddingTop: 5,paddingBottom: 10,paddingHorizontal: (width/4) + 20 }}>View Dogs By Age</Text>
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
            
            
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AgePosts', {firstAge: '0' ,secondAge: '1'})}>
            <Category
               width={width}
               height={height}
               info ='0-1 Year Old'
               infoImage ={require('../../assets/1yearold.jpeg')}
             />
             </TouchableOpacity>
   
             <TouchableOpacity onPress={() => this.props.navigation.navigate('AgePosts', {firstAge: '2' ,secondAge: '5'})}>
               <Category
               width={width}
               height={height}
               info ='2-5 Years Old'
               infoImage ={require('../../assets/5yearold.jpeg')}
             />
             </TouchableOpacity>
   
              <TouchableOpacity onPress={() => this.props.navigation.navigate('AgePosts', {firstAge: '6' ,secondAge: '10'})}>
               
               <Category
               width={width}
               height={height}
               info ='6-10 Years Old'
               infoImage={require('../../assets/10yearold.jpeg')}
             />
             </TouchableOpacity>
   
             <TouchableOpacity onPress={() => this.props.navigation.navigate('AgePosts', {firstAge: '11' ,secondAge: '100'})}>
               <Category
               width={width}
               height={height}
               info ='11+ Years Old'
               infoImage={require('../../assets/11yearold.jpeg')}
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

export default connect(mapStateToProps, mapDispatchToProps)(AgeCategory)