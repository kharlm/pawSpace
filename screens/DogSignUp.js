import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ImagePicker, Permissions } from 'expo';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { updateDogname, updateBreed, updateAge, updateGender, updateDogtag, updateWeight,updateStory, updateDog, dogsignup } from '../actions/dog'
import { updatePhoto, updateEmail, updatePassword, updateUsername,signup, updateUser } from '../actions/user'


class DogSignup extends React.Component {

  onPress = () => {
    const { routeName } = this.props.navigation.state
    if(routeName === 'DogSignUp'){
      
      //this.props.signup()
      //this.props.updateUser()
      this.props.dogsignup()
      
      
      this.props.navigation.navigate('Home')
    }
    else {
      //this.props.updateUser()
        this.props.updateDog()
        this.props.navigation.goBack()
      }
      
  }

 /* openLibrary = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status === 'granted') {
      const image = await ImagePicker.launchImageLibraryAsync()
      if(!image.cancelled ){
        const url = await this.props.uploadPhoto(image)
        this.props.updatePhoto(url)
      }
    }
  }
  */

  render() {
    const { routeName } = this.props.navigation.state
    return (
      <View style={[styles.container, styles.center]}>
        <TouchableOpacity style={styles.center} onPress={this.openLibrary} >
          <Image style={styles.roundImage} source={{}}/>
          <Text>Upload Photo</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.border}
          
          value={this.props.dog.dogname}
          onChangeText={input => this.props.updateDogname(input)}
          placeholder='Dog Name'
        />

         <TextInput
          style={styles.border}
         
          value={this.props.dog.age}
          onChangeText={input => this.props.updateAge(input)}
          placeholder='Age'
        />
          <TextInput
          style={styles.border}
         
          value={this.props.dog.breed}
          onChangeText={input => this.props.updateBreed(input)}
          placeholder='Breed'
        />
         <TextInput
          style={styles.border}
         
          value={this.props.dog.gender}
          onChangeText={input => this.props.updateGender(input)}
          placeholder='Gender'
        />
         <TextInput
          style={styles.border}
          
          value={this.props.dog.weight}
          onChangeText={input => this.props.updateWeight(input)}
          placeholder='Weight'
        />
         <TextInput
          style={styles.border}
         
          value={this.props.dog.story}
          onChangeText={input => this.props.updateStory(input)}
          placeholder='Story'
        />
        <TextInput
            style={styles.border}
        	value={this.props.dog.dogtag}
        	onChangeText={input => this.props.updateDogtag(input)}
        	placeholder='Dog Tag'
        />
      	<TouchableOpacity style={styles.button} onPress={this.onPress}>
      		<Text>Done</Text>
      	</TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateDogname, updateBreed, updateAge, updateGender, updateDogtag, updateWeight,updateStory, updateDog,dogsignup,signup,updateUser}, dispatch)
}

const mapStateToProps = (state) => {
  return {
    dog: state.dog
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DogSignup)