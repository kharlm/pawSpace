import React, { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from '../styles'
import { View, Text, StyleSheet, Image, Dimensions, Platform,ScrollView, TouchableOpacity} from "react-native";
import {getDog,getDogs} from '../actions/dog'
import Card from './Card';
import * as firebase from 'firebase';
import DogParks from './DogParks';
import SwipeCards from 'react-native-swipe-cards'
import db from '../config/firebase';
import ConfettiCannon from 'react-native-confetti-cannon';
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
const GOOGLE_PLACEAPI='https://maps.googleapis.com/maps/api/place/textsearch/json?query=dogpark+in+'
const key = 'AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk'
const GOOGLE_API = 'https://maps.googleapis.com/maps/api/geocode/json?'
const { width,height } = Dimensions.get('window');
const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49 // found from https://stackoverflow.com/a/50318831/6141587
let imageUnavailable = 'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6'

class ItsAMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DogParks:{},
            city:"",
            DogParkPhotos:[]
        }
    }

    componentDidMount = () => {
        this.getMyLocation()
        const card = this.props.navigation.getParam('card','')
       
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
         
          this.getDogParks();
      });
       
    };

    getDogParks = async () => {
        console.log("city"+this.state.city)
    
        const response = await fetch(GOOGLE_PLACEAPI+this.state.city+'&key='+key)
        const data = await response.json()
        this.setState({
          DogParks: data.results
        });
    
        let res = JSON.stringify(this.state.DogParks[3])
       
       this.getDogParkPhoto()
      }

      getDogParkPhoto = async () => {

        let response1
        let response2
        let response3
        let response4
     
         const url1 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${this.state.DogParks[0]?this.state.DogParks[0].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
          response1 = await fetch(url1)
          
         const url2 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${this.state.DogParks[1]?this.state.DogParks[1].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
          response2 = await fetch(url2)
     
         const url3 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${this.state.DogParks[2]?this.state.DogParks[2].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
          response3 = await fetch(url3)
         
         const url4 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${this.state.DogParks[3]?this.state.DogParks[3].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
          response4 = await fetch(url4)
     
         this.setState({
           DogParkPhotos: [response1,response2,response3,response4],
           loadingPark: true
         })
        }
         

     render(){
        const card = this.props.navigation.getParam('card','');
        return(
            <View >
            <ScrollView style={{paddingTop: 5}}>
                 
            <Text style={{fontWeight: 'bold',color:'#ff0000', fontSize: 40,paddingLeft: (width/2)-100}}>Its a Match!</Text>
            <Text style={{paddingLeft: (width/2)-100,paddingTop: 10, fontWeight:'bold'}}>You and {card.dogname} Liked each other</Text>
            <View
            style={{
             flexDirection: "row",
             flexWrap: "wrap",
             justifyContent: "space-between",
             paddingTop: 5
           }}
         >
        <View style={{paddingTop: 3,paddingLeft: 15, flex: 1}}>
        <Image style={styles1.imageContainer} source={{uri: this.props.dog.photo}}/>
        <Text style={styles1.title}>{this.props.dog.dogname}</Text>
        <Text style={styles1.caption}>{this.props.dog.breed}</Text>
        </View>
        <View style={{paddingTop: 3,paddingLeft: 15, flex: 1}}>
        <Image style={styles1.imageContainer} source={{uri: card.photo}}/>
        <Text style={styles1.title}>{card.dogname}</Text>
        <Text style={styles1.caption}>{card.breed}</Text>
        </View>
        </View>
        <Text style={{paddingTop: 8, paddingHorizontal: 25,paddingBottom: 10,fontWeight:'bold'}}>Plan a play date at the nearest dog park which is:</Text>
        <View style={{paddingLeft: 100}}>
        <DogParks
            imageUri={this.state.DogParkPhotos[0] ? this.state.DogParkPhotos[0].url: imageUnavailable}
            width={width}
            name={this.state.DogParks[0] ? this.state.DogParks[0].name : "No dog Park Available"}
            type={this.state.DogParks[0] ? this.state.DogParks[0].formatted_address :"No dog Park Available"}
          />
         </View>
         <View
            style={{
             flexDirection: "row",
             flexWrap: "wrap",
             justifyContent: "space-between",
           }}
         >
         <TouchableOpacity style={styles1.button} onPress={() => this.props.navigation.navigate('MatchesScreen', {user: card, page:'ItsaMatch'})}>
              <Text style={styles.bold}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles1.button} onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.bold}>Continue Swiping</Text>
            </TouchableOpacity>
            </View>
            <ConfettiCannon count={200} fallSpeed={4000} fadeOut={true} origin={{x: -10, y: 0} } />
        </ScrollView>
        </View>       
        );
    }
  
}

const styles1 = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    button: {
        margin: 5,
        padding: 3,
        alignItems: 'center',
        borderColor: '#d3d3d3',
        borderWidth: 1,
        borderRadius: 5,
        width: 150
      },
    imageContainer: {
      width: ((width*.93)-30)/2,
      height: (height - BOTTOM_BAR_HEIGHT * 12)/1.5,
      borderRadius: 25,
      overflow: 'hidden', // this does magic
    },
    title: {
      position: 'absolute',
      left: 25 ,
      bottom: 30,
      fontSize: 25,
      fontWeight: 'bold',
      color: '#fff'
    },
    caption: {
      position: 'absolute',
      left: 25,
      bottom: 10,
      fontSize: 15,
      color: '#fff'
    },
  })

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getDog,getDogs}, dispatch)
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(ItsAMatch)