import React, { Component } from 'react'
import { Platform, StyleSheet,Dimensions,View, Image, Text} from 'react-native'
import { Tile } from 'react-native-elements'
const { width,height } = Dimensions.get('window');

const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49 // found from https://stackoverflow.com/a/50318831/6141587

class Card extends Component {
    render(){
   
        //console.log("card0: "+this.props.image)

   

      
      
      
        return(
        <View style={{paddingTop: 20,paddingLeft: 15, flex: 1}}>
        <Image style={styles.imageContainer} source={{uri: this.props.photo}}/>
        <Text style={styles.title}>{this.props.dogname}</Text>
        <Text style={styles.caption}>{this.props.breed}</Text>
        </View>
        );
    }
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    imageContainer: {
      width: width - 30,
      height: height*.7,
      borderRadius: 25,
      overflow: 'hidden', // this does magic
    },
    title: {
      position: 'absolute',
      left: 25 ,
      bottom: -(height*.65),
      fontSize: 30,
      fontWeight: 'bold',
      color: '#FFF'
    },
    caption: {
      position: 'absolute',
      left: 25,
      bottom: -(height*.67),
      fontSize: 18,
      color: '#fff'
    },
  })
  export default Card;