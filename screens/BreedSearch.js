import React, { Component } from "react";
import { View, Text, StyleSheet, Image,ImageBackground } from "react-native";
class BreedSearch extends Component {
  render() {
    return (
        <View
        style={{
          width: this.props.width /  2,
          height: this.props.height / 2.5 ,
          
        }}
      >
      <ImageBackground
 source ={{uri: this.props.infoImage}}
  style={{
    height: this.props.height / 2.5 ,
    width: this.props.width / 2 ,
    position: 'relative', // because it's parent
    top: 2,
    left: 2,
    flex: 1,
  }}
  imageStyle={{ borderRadius: 25,opacity:1 }}
>
  <Text
    style={{
      fontWeight: 'bold',
      fontSize: 25,
      color: 'white',
      position: 'absolute', // child
      justifyContent: 'center', alignItems: 'center',
      top: 150, left: 70, right: 0, bottom: 0,
      paddingBottom: 10
    }}
  >
      {this.props.info}
  </Text>
  <Text
    style={{
      fontWeight: 'bold',
      fontSize: 25,
      color: 'white',
      position: 'absolute', // child
      justifyContent: 'center', alignItems: 'center',
      top: 90, left: 70, right: 0, bottom: 0,
    }}
  >   {"\n"}     {this.props.infoData}
  </Text>
</ImageBackground> 
</View>
    );
  }
}
export default BreedSearch;