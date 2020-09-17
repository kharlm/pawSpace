import React from 'react';
import styles from '../../styles.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, SafeAreaView, TextInput, FlatList, Image, TouchableOpacity,Dimensions } from 'react-native';
import db from '../../config/firebase';
import { getDog } from '../../actions/dog'
import DogInfo from '../DogInfo';
import Category from '../Category';
import { ScrollView } from 'react-native';
const  { width,height } = Dimensions.get('window');

class WeightCategory extends React.Component {
    render() {
        return (
    
                <ScrollView>
            <Text style={{fontWeight:"700",fontSize: 18,paddingTop: 5,paddingHorizontal: (width/4) + 5 }}>View Dogs By Weight</Text>
            <View
                     style={{
                      flexDirection: "row",
                      padding: 10,
                      marginTop: 5,
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
             <TouchableOpacity onPress={() => this.props.navigation.navigate('WeightPosts', {firstWeight: '0' ,secondWeight: '22'})}>
             <Category
                width={width}
                height={height}
                info='Small Dogs - 0 to 22 pounds'
                infoImage ={require('../../assets/smalldog.jpeg')}
              />
              </TouchableOpacity>
    
              <TouchableOpacity onPress={() => this.props.navigation.navigate('WeightPosts', {firstWeight: '23' ,secondWeight: '57'})}>
                <Category
                width={width}
                height={height}
                info ='Medium Dogs - 23 to 57 pounds'
                infoImage={require('../../assets/mediumdog.jpeg')}
              />
              </TouchableOpacity>
    
               <TouchableOpacity onPress={() => this.props.navigation.navigate('WeightPosts', {firstWeight: '58' ,secondWeight: '99'})}>
                
                <Category
                width={width}
                height={height}
                info ='Large Dogs - 58 to 99 pounds'
                infoImage={require('../../assets/largedog.jpeg')}
              />
              </TouchableOpacity>
    
              <TouchableOpacity onPress={() => this.props.navigation.navigate('WeightPosts', {firstWeight: '99' ,secondWeight: '1000'})}>
                <Category
                width={width}
                height={height}
                info ='Extra Large Dogs - 100 or more pounds'
                infoImage={require('../../assets/extralarge.jpg')}
              />
             </TouchableOpacity>
              </View>
              </ScrollView>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(WeightCategory)