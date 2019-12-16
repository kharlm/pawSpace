import React, { Component } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { connect } from 'react-redux'
import firebase from 'firebase'
import { bindActionCreators } from 'redux'
import DogPickerComponent from "./DogPickerComponent"
import db from '../config/firebase'
import { getDog } from '../actions/dog';
import { getUser } from '../actions/user'


class DogPicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            numberOfDogs: 0,
            dogs:[],
            userDogs: this.props.user.dogs
        }
    }
    componentDidMount = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.dogLengthMoreThanOne(user.uid)
                this.props.getUser(user.uid, 'LOGIN')
                this.props.getUser(user.uid, 'GET_PROFILE')

                this.getUserData(user.uid)
            }
        })
    }
   
    getUserData = async (id) => {
        let dog1;
         try{
          console.log("in get dog data")
           const userQuery = await db.collection ('users').doc(id).get()
            user1 = userQuery.data()
           
            user1.dogs.map((data)=>{
                this.getDogData(data)

            })
            
          
           
            
         }
         catch(e){
           alert(e)
         }
    
         
      }

      getUserDog = (id) => {
        console.log("Dog Id"+id)
        this.props.getDog(id,'DOGLOGIN')
        this.props.navigation.navigate('Home')
    
      }
    getDogData = async (id) => {
         try{
           const dogQuery = await db.collection ('dogs').doc(id).get()
            dog = dogQuery.data()
            let res = JSON.stringify(dog.dogId);
            console.log("dogoo"+dog.dogId)
            this.setState({
                dogs: [...this.state.dogs, dog]
               })
           
            
         }
         catch(e){
           alert(e)
         }
      }
    render() {
        

        if (this.props.user.dogs == null) return null
        

       
        const dogPicker = this.props.user.dogs.map((data,i) => {
            key={i}
            if(this.state.dogs[i]){
            return (
                <View>
                <TouchableOpacity onPress={() => this.getUserDog(this.state.dogs[i].dogId)}>
               <DogPickerComponent name={this.state.dogs[i].dogname}/>
               </TouchableOpacity>
               </View>
            )
            }
        })
        return (
            <ScrollView>
                <View style={{
                    padding: 20,
                    marginTop: 5,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",

                }}>
                    {dogPicker}

                </View>
            </ScrollView>

        );
    }

    dogLengthMoreThanOne = async (id) => {
        try {
            const userQuery = await db.collection('users').doc(id).get()
            user = userQuery.data()

            this.setState({
                numberOfDogs: 2
            })

        }
        catch (e) {
            alert(e)
        }
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser, getDog }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        profile: state.profile,
        dogname: state.dogname,
        dog: state.dog,
        dogprofile: state.dogprofile


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DogPicker)
