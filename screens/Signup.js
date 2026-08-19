import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ImagePicker from 'expo-image-picker'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase'
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { updatePhoto, updateEmail, updatePassword, updateUsername,signup, updateUser,signupError } from '../actions/user'
import { uploadPhoto } from '../actions'
import {noDog} from '../actions/nodog'


class Signup extends React.Component {

  onPress = () => {
    const routeName = this.props.route.name
    if(routeName === 'Signup'){
      this.props.signup()
      global.foo="dogsignup";
      onAuthStateChanged(auth, (user) => {
      if(user){
       if(this.props.user != null){
        this.props.navigation.navigate('DogSignUp')
        }
       }
     })
      }
     else {
      this.props.updateUser()
      this.props.navigation.goBack()
    }
  }

  noDog = () => {
    const routeName = this.props.route.name
    this.props.noDog()
    console.log("route on signup page: "+routeName)
    if(routeName === 'Signup'){
      this.props.signup()
      global.foo="dogsignup";
      onAuthStateChanged(auth, (user) => {
      if(user){
       if(this.props.user != null){
        this.props.navigation.navigate('Home')
        }
       }
     })
      }
     else {
      this.props.updateUser()
      this.props.navigation.goBack()
    }

  }

  openLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync()
      if(!result.canceled){
        const url = await this.props.uploadPhoto(result.assets[0])
        this.props.updatePhoto(url)
      }
    }
  }
  render() {
    const routeName = this.props.route.name
    return (
      <View style={[styles.container, styles.center]}>
        <TextInput
          style={styles.border}
          editable={routeName === 'Signup' ? true : false}
          value={this.props.user.email}
          onChangeText={input => this.props.updateEmail(input)}
          placeholder='Email'
        />
        <TextInput
          style={styles.border}
          editable={routeName === 'Signup' ? true : false}
          value={this.props.user.password}
          onChangeText={input => this.props.updatePassword(input)}
          placeholder='Password'
          secureTextEntry={true}
        />
      	<TouchableOpacity style={styles.button} onPress={()=>this.onPress()}>
      		<Text>Add a Dog</Text>
      	</TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>this.noDog()}>
      		<Text>I dont have a dog</Text>
      	</TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updatePhoto, uploadPhoto, updateUser, updateEmail, updatePassword, updateUsername,signup,signupError,noDog}, dispatch)
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    signupError: state.signupError
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
