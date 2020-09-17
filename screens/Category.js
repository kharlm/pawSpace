import React, { Component } from "react";
import { View, Text, StyleSheet, Image,ImageBackground } from "react-native";
class Category extends Component {
  render() {
    return (
        <View
        style={{
          width: this.props.width/ 2.2 ,
          height: this.props.height / 2.8  ,
          marginBottom: 15,
          borderRadius: 20,
          justifyContent: 'center'
         
          
        }}
      >
      <ImageBackground
      
      source={this.props.infoImage}
 //source ={{uri: '../assets/smalldog.jpeg'}}
  style={{
    height: null ,
    width: null ,
    position: 'relative', // because it's parent
    resizeMode: "cover",
    top: 2,
    left: 2,
    flex: 1
  }}
  imageStyle={{ borderRadius: 20,opacity:1 }}
>
  <Text
    style={{
      fontWeight: 'bold',
      fontSize: 20,
      color: 'white',
      position: 'absolute', // child
      justifyContent: 'center', alignItems: 'center',
      top: 150, left: 13, right: 0, bottom: 0,
      textAlign: 'center',
      paddingBottom: 10
    }}
  >
      {this.props.info}
  </Text>
</ImageBackground> 
</View>
    );
  }
}
export default Category;