import React, { Component } from "react";
import { View, Text, StyleSheet, Image,ImageBackground } from "react-native";
class DogInfo extends Component {
  render() {
    return (
        <View
        style={{
          width: this.props.width / 2 ,
          height: this.props.height / 4 ,
          borderRadius: 5
        }}
      >
      <ImageBackground
 source ={{uri: this.props.infoImage}}
  style={{
    height: this.props.height / 4 ,
    width: this.props.width / 2 ,
    position: 'relative', // because it's parent
    top: 2,
    left: 2,
    flex: 1,
  }}
  imageStyle={{ borderRadius: 25,opacity:.8 }}
>
  <Text
    style={{
      fontWeight: 'bold',
      fontSize: 30,
      color: 'white',
      position: 'absolute', // child
      justifyContent: 'center', alignItems: 'center',
      top: 80, left: 70, right: 0, bottom: 0,
      paddingBottom: 10
    }}
  >
      {this.props.info}
  </Text>
  <Text
    style={{
      fontWeight: 'bold',
      fontSize: 20,
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
export default DogInfo;