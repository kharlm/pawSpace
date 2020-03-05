import React, { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, StyleSheet, Image, Dimensions, Platform,TouchableOpacity} from "react-native";
import {getDog,getDogs,getLocation} from '../actions/dog'
import Card from './Card';
import * as firebase from 'firebase';

import SwipeCards from 'react-native-swipe-cards'
import db from '../config/firebase';
const { width,height } = Dimensions.get('window');
const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49 // found from https://stackoverflow.com/a/50318831/6141587

class Match extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
   
    this.props.getDog
    this.props.getLocation(this.props.dog)
    //this.props.getDogs()
   
    
   }
   componentWillMount = () => {
   
    this.props.getDog
   this.props.getDogs(this.props.dog)
    
   }

   checkMatch = async (card) => {
     console.log("Im in check match")
     let dogs = []
      const query = await db.collection('dogs').where('dogId', '==', card.dogId).get()
      
      query.forEach(function(response) {
        dogs.push(response.data())
        })

        //check if dog is in swipes array and if it is then check if the value is true
        for(let i=0; i<dogs[0].swipes.length;i++){
          if((Object.keys(dogs[0].swipes[i])[0]===card.dogId)){
                //console.log("EQUIVALENT")
                if(Object.values(dogs[0].swipes[i])[0]===true){
                  this.props.navigation.navigate('ItsAMatch',{ card: card })
                  console.log("EQUIVALENT")
                  console.log("my dog id: "+this.props.dog.dogId)
                  console.log("Their dog id: "+card.dogId)
                  var me = {
                    id: this.props.dog.dogId,
                    photoUrl: this.props.dog.photo,
                    name: this.props.dog.dogname
                  }
                  var user = {
                    id: card.dogId,
                    photoUrl: card.photo,
                    name: card.dogname
                  }

                  db.collection('dogs').doc(this.props.dog.dogId).update({
                    chat: firebase.firestore.FieldValue.arrayUnion({
                     user
                    }
                    )
                  })

                  db.collection('dogs').doc(card.dogId).update({
                    chat: firebase.firestore.FieldValue.arrayUnion({
                     me
                    }
                    )
                  })
                }
       }
          
      }
    }

   handleYup (card) {
    
    console.log("id "+card.dogId)
    db.collection('dogs').doc(this.props.dog.dogId).update({
      swipes: firebase.firestore.FieldValue.arrayUnion({
		    [card.dogId]: true
      }
      )
      
    })
    
    
   this.checkMatch(card)
  }

  handleNope (card) {
    console.log("in hadnle")
    db.collection('dogs').doc(this.props.dog.dogId).update({
      swipes: firebase.firestore.FieldValue.arrayUnion({
		    [card.dogId]: false
      }
      )
      
    })
  }

   
  render() {
    if(this.props.cards.cards){
let res = JSON.stringify(this.props.cards.cards)
console.log("cards Length: "+this.props.cards.cards.length)
    }
    return (
      <View>
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity  onPress={() => this.props.navigation.navigate("MatchProfile")}>
      <Text style={styles.cardButton}>Profile</Text>
      </TouchableOpacity>
     <Text style={{paddingRight:width*.5}}></Text>
      <TouchableOpacity  onPress={() => this.props.navigation.navigate("MatchesScreen")}>
      <Text style={styles.cardButton}>Matches</Text>
      </TouchableOpacity>
      </View>
      <SwipeCards
        cards={this.props.cards.cards}
        stack={false}
        renderCard={(cardData) => <Card {...cardData}/>}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={false}
        showNope={false}
        handleYup={this.handleYup.bind(this)}
        handleNope={this.handleNope.bind(this)}
        handleMaybe={this.handleMaybe}
        hasMaybeAction={false}/>
        </View>
    )

    /*let dog = {}
    dog= this.props.dog
   
    return (
     <Card
     title= {dog.dogname}
     caption= {dog.breed}
     image = {dog.photo}
     />
    );
    */
  }
  
}

class Hello extends React.Component{
  render(){
    return(
      <Text>Hello There</Text>
    )
  }
}

class NoMoreCards extends React.Component {
  render() {
    console.log('in no more cards')
    return (
      <View>
      <Text style={{position: 'absolute',
      left: -150 ,
      bottom: -(height*.3),
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000'}}>There are no more dogs to swipe</Text>
    </View>
    )
  }
}
/*
buttonSmall: {
  margin: 10,
  marginBottom: 0,
  padding: 5,
  alignItems: 'center',
  borderColor: '#d3d3d3',
  borderWidth: 1,
  borderRadius: 5,
  width: 125
},
*/

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getDog,getDogs,getLocation}, dispatch)
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

//export default connect(mapStateToProps, mapDispatchToProps)(Match)