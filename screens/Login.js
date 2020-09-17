import React from 'react'
import styles from '../styles'
import firebase from 'firebase'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { updateEmail, updatePassword, login, getUser, facebookLogin} from '../actions/user'
import {guest} from '../actions/guest'
import {noDog} from '../actions/nodog'
import {getDog,getDogs} from '../actions/dog'
import {getPosts} from '../actions/post'
import db from '../config/firebase'

class Login extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      loading: true,
      moreThanOneDog: false,
      login: false,
      noDog: ""
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        if(this.props.user && global.foo!="dogsignup"){
          this.dogLengthMoreThanOne(user.uid)
            //this.getUserData(user.uid) 
            user = this.props.getUser(user.uid, 'LOGIN')

        }
      }
      
    })
  }

  guest() { 
    this.props.guest()
    this.props.navigation.navigate('Home')
  }

   getUserData = async (id) => {
    let dog1;
    console.log("dog: "+this.props.nodog)
     try{

      if(this.props.nodog!= true){
       const userQuery = await db.collection ('users').doc(id).get()
        user1 = userQuery.data()
        let res = JSON.stringify(user1.dogs[0]);

        
        this.props.getDog(user1.dogs[0], 'GET_DOGPROFILE')
        this.props.getPosts(user1.dogs[0])
        this.setState({
          userData: user1,
          loading: false
        })
      }
     }
     catch(e){
       //alert(e)
     }

     let res1 = JSON.stringify(this.state.loading);
  }

  dogLengthMoreThanOne = async (id) => {
    try{
       const userQuery = await db.collection ('users').doc(id).get()
        user = userQuery.data()
        
     
        if(user.dogs.length==0){
          this.setState({
            noDog: true
          })
        }
        if(user.dogs.length>1){
          
          this.setState({
            moreThanOneDog: true,
            login: true,
            noDog: false
          })
        }

        else{
          this.setState({
            moreThanOneDog: false,
            login: true
          })
        }
      
     }
     catch(e){
       alert(e)
     }

     let res1 = JSON.stringify(this.state.loading);
  }



  render() {
    const { routeName } = this.props.navigation.state
  
   /* if(this.state.loading===true){
  }
  */

 
    if(this.state.noDog===true && routeName!='DogSignUp'){
      console.log("route: "+routeName)
      this.props.noDog()
      return(
      this.props.navigation.navigate('Home')
      )
    }
  

    if(this.state.moreThanOneDog===true){

      return(
      this.props.navigation.navigate('DogPicker')
      )
    }

    if(this.state.moreThanOneDog===false && this.state.login===true){
     
      return (
      this.props.getDog(user.dogs[0],'DOGLOGIN'),
      this.props.navigation.navigate('Home')
      )
      
    }

   else{
    return (
      <View style={[styles.container, styles.center]}>
        <Image style={{width: 300, height: 100}} source={require('../assets/logo.png')} />
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
      	<Text style={{margin: 20}}>OR</Text>
      	<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Signup')}>
      		<Text>Signup</Text>
      	</TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.guest()}>
      		<Text>View Without An Account</Text>
      	</TouchableOpacity>

      </View>
    );
  }
}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateEmail, updatePassword, login, getUser, facebookLogin,getDog,getDogs,getPosts,guest,noDog}, dispatch)
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    profile: state.profile,
    dogname: state.dogname,
    dog: state.dog,
    nodog: state.nodog
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)