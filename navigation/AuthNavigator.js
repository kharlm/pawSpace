import React from 'react';
import { Ionicons } from '@expo/vector-icons'
import Login from '../screens/Login'
import SignupScreen from '../screens/Signup'
import DogSignUpScreen from '../screens/DogSignUp'
import DogPickerScreen from '../screens/DogPicker'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { TouchableOpacity } from 'react-native'

const StackNavigator = createStackNavigator(
  {
    Login: { 
      screen: Login,
      navigationOptions: {
      	header: null
      }
    },
    Signup: { 
      screen: SignupScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Signup',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    DogPicker: { 
      screen: DogPickerScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'DogPicker',
      })
    },
    DogSignUp: { 
      screen: DogSignUpScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'DogSignup',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    }
  }
);

export default createAppContainer(StackNavigator);