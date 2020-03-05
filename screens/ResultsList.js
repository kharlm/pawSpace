import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';
import ResultsDetail from './ResultsDetail';
import { getPosts, likePost, unlikePost, getAdopt } from '../actions/post'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
let imageUnavailable = 'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6'
const GOOGLE_API = 'https://maps.googleapis.com/maps/api/geocode/json?'
const GOOGLE_PLACEAPI='https://maps.googleapis.com/maps/api/place/textsearch/json?query='
const key = 'AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk'

class ResultsList extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      vet:{},
      city:"",
      vetPhotos:[],
      loadingData: false
      
    };

  
    
  }
  componentDidMount = () => {
    this.getMyLocation()
   
  }

  getMyLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        this.setState({
            myLocation: 'Permission denied',
        });
    }
    let location = await Location.getCurrentPositionAsync({});
    const url = `${GOOGLE_API}latlng=${location.coords.latitude},${location.coords.longitude}&key=${'AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk'}`
    
    const response = await fetch(url)
    const response1 = await fetch(GOOGLE_PLACEAPI)
    const data = await response.json()
    const data1 = await response1.json()
   
    let ind;
    let ind1
    for(var i=0;i<data.results.length;++i){
      
      
      if(data.results[i].types[0]=="postal_code"){
        
          ind = data.results[i].address_components[0].long_name;  
      }

      if(data.results[i].types[0]=="locality"){

          ind1 = data.results[i].address_components[0].long_name; 
      }
     
    }
    let res = JSON.stringify(data.results[0].address_components[6].types[0])
    
    this.setState({
        myLocation: location,
        zipCode: ind,
        locationLoading: true,
        city: ind1
        
    },() => {
     
      this.getPlaces();
  });
   
};

getPlaces = async () => {


  const vetResponse = await fetch(GOOGLE_PLACEAPI+'veterinary+in+'+this.state.city+'&key='+key)
  const vetData = await vetResponse.json()
  this.setState({
    vet: vetData.results
  });
  
  
 
 this.getPhotos()
}


getPhotos = async () => {

  let vetResponse1
  let vetResponse2
  let vetResponse3
  let vetResponse4

   const url1 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&photoreference=${this.state.vet[0]?this.state.vet[0].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
    vetResponse1 = await fetch(url1)
    
   const url2 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${this.state.vet[1]?this.state.vet[1].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
    vetResponse2 = await fetch(url2)

   const url3 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&photoreference=${this.state.vet[2]?this.state.vet[2].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
    vetResponse3 = await fetch(url3)
   
   const url4 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&photoreference=${this.state.vet[3]?this.state.vet[3].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
    vetResponse4 = await fetch(url4)

   this.setState({
     vetPhotos: [vetResponse1,vetResponse2,vetResponse3,vetResponse4],
     loadingData: true
   })
  }
   

render(){
if(this.state.loadingData==false){
  return( 
    null
  )
}
else{
  console.log("loading "+this.state.loadingData)
  let res = JSON.stringify(this.state.vet)
  console.log("data:"+res)
  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Vets</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false} 
      >
       <TouchableOpacity
              onPress={() =>
                navigation.navigate('ResultsShow',  this.state.vet[0])
              }
            ></TouchableOpacity>
              <ResultsDetail result={this.state.vet[0]}/>
              <TouchableOpacity
              onPress={() =>
                navigation.navigate('ResultsShow',  this.state.vet[0])
              }
            ></TouchableOpacity>
              <ResultsDetail result={this.state.vet[1]}/>
              </ScrollView>
    </View>
  );
};
}
}


const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5
  },
  container: {
    marginBottom: 10
  }
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getPosts}, dispatch)
}

const mapStateToProps = (state) => {
  return {
    post: state.post,
    user: state.user,
    userprofile: state.profile,
    dog: state.dog,
    cards: state.cards
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsList)
