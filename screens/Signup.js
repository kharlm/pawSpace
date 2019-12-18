import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ImagePicker, Permissions } from 'expo';
import firebase from 'firebase'
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { updatePhoto, updateEmail, updatePassword, updateUsername,signup, updateUser,signupError } from '../actions/user'
import { uploadPhoto } from '../actions'
import { dogsignup} from '../actions/dog'

class Signup extends React.Component {

  onPress = () => {
    const { routeName } = this.props.navigation.state
    if(routeName === 'Signup'){
      this.props.signup()
      global.foo="dogsignup";
     /* firebase.auth().onAuthStateChanged((user) => {
        if(user){
        if(this.props.user != null){
        this.props.navigation.navigate('DogSignUp')
          }
        }
      })*/
      this.props.navigation.navigate('DogSignUp')
      }
     else {
      this.props.updateUser()
      this.props.navigation.goBack()
    }
  }

  openLibrary = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status === 'granted') {
      const image = await ImagePicker.launchImageLibraryAsync()
      if(!image.cancelled ){
        const url = await this.props.uploadPhoto(image)
        this.props.updatePhoto(url)
      }
    }
  }

  render() {
    const { routeName } = this.props.navigation.state
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
        <TextInput
        	style={styles.border}
        	value={this.props.user.username}
        	onChangeText={input => this.props.updateUsername(input)}
        	placeholder='Username'
        />
      	<TouchableOpacity style={styles.button} onPress={()=>this.onPress()}>
      		<Text>Add a Dog</Text>
      	</TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updatePhoto, uploadPhoto, updateUser, updateEmail, updatePassword, updateUsername,signup,signupError }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    signupError: state.signupError
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)