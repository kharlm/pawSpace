import React, { Component } from 'react';
import styles from '../stylesCard';
import { WebView } from 'react-native-webview';
let imageUnavailable = 'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6'


import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList, Dimensions
} from 'react-native';
const { width, height } = Dimensions.get('window');
import CardItem from './CardItem';

import Demo from '../assets/Demo.js';
import { DrawerItems } from 'react-navigation';

class AdoptList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showWebView: false,
      webPage: ""
    }
  }

  render() {

    const adoptList = this.props.navigation.getParam('adoptList','');

    if(this.state.showWebView){ 
      return (
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={()=> {this.setState({showWebView: false}) }}>
    <Text style={{fontSize: 30, color:'#0000ff',paddingLeft: 8}}>x</Text>
  </TouchableOpacity>
        <WebView source={{ uri: this.state.webPage }} />
        
      </View>
      )
    }

  return (
    
    <ImageBackground
          source={require('../assets/homebackground1.jpg')}
          imageStyle= 
          {{opacity:.12}}
          style={{width:null,height:null,flex: 1
          }}
         resizeMode="repeat"
        >
      <View style={styles.containerMatches}>
        <ScrollView>
          <View style={styles.top}>  
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              paddingHorizontal: 20
            }}
          >
            Dogs in your area up for adoption
        </Text>
          </View>
          <FlatList
            numColumns={2}
            data={adoptList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.setState({showWebView: true, webPage:item.url})}>
                <CardItem

                  image ={{uri: item.photos[0]?item.photos[0].large:imageUnavailable}}
                  name={item.name?item.name:"No name available"}
                  status={item.breeds?item.breeds.primary:"Breed unavailable"}
                  variant
                />
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </View>
    </ImageBackground>
  );

            }
  
};

export default AdoptList;