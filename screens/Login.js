import React from 'react'
import styles from '../styles'
import firebase from 'firebase'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { updateEmail, updatePassword, login, getUser, facebookLogin} from '../actions/user'
import {getDog} from '../actions/dog'
import db from '../config/firebase'

class Login extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      loading: true,
      moreThanOneDog: false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
      
        if(this.props.user && global.foo!="dogsignup"){
          this.dogLengthMoreThanOne(user.uid)
          this.getUserData(user.uid) 
          if(this.state.moreThanOneDog!=false)  {
            user = this.props.getUser(user.uid, 'LOGIN')     
            this.props.navigation.navigate('Home')
          }

          else{
            this.props.navigation.navigate('DogPicker')
          }
        }
      }
    })
  }

   getUserData = async (id) => {
    let dog1;
     try{
      console.log("in get dog data")
       const userQuery = await db.collection ('users').doc(id).get()
        user1 = userQuery.data()
        let res = JSON.stringify(user1.dogs[0]);
        
        this.props.getDog(user1.dogs[0], 'GET_DOGPROFILE')
       
        this.setState({
          userData: user1,
          loading: false
        })
     }
     catch(e){
       alert(e)
     }

     let res1 = JSON.stringify(this.state.loading);
  }

  dogLengthMoreThanOne = async (id) => {
    try{
       const userQuery = await db.collection ('users').doc(id).get()
        user = userQuery.data()
        
        console.log("Number of dogs"
        +user.dogs.length)

        if(user.dogs.length>1){
          this.setState({
            moreThanOneDog: true
          })
        }

        else{
          this.setState({
            moreThanOneDog: false
          })
        }
      
     }
     catch(e){
       alert(e)
     }

     let res1 = JSON.stringify(this.state.loading);
  }



  render() {
    let res1 = JSON.stringify(this.state.loading);
    if(this.state.loading===true){
  }
    return (
      <View style={[styles.container, styles.center]}>
        <Image style={{width: 300, height: 100}} source={require('../assets/logo.jpg')} />
        <TextInput
        	style={styles.border}
        	value={this.props.user.email}
        	onChangeText={input => this.props.updateEmail(input)}
        	placeholder='Email'
        />
        <TextInput
        	style={styles.border}
        	value={this.props.user.password}
        	onChangeText={input => this.props.updatePassword(input)}
        	placeholder='Password'
        	secureTextEntry={true}
        />
      	<TouchableOpacity style={styles.button} onPress={() => this.props.login()}>
      		<Text>Login</Text>
      	</TouchableOpacity>
        <TouchableOpacity style={styles.facebookButton} onPress={() => this.props.facebookLogin()}>
          <Text style={styles.white}>Facebook Login</Text>
        </TouchableOpacity>
      	<Text style={{margin: 20}}>OR</Text>
      	<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Signup')}>
      		<Text>Signup</Text>
      	</TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateEmail, updatePassword, login, getUser, facebookLogin,getDog }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    profile: state.profile,
    dogname: state.dogname,
    dog: state.dog

   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)