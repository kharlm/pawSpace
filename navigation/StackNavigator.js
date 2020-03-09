import React from 'react';
import { Ionicons } from '@expo/vector-icons'
import Login from '../screens/Login'
import HomeScreen from '../screens/Home'
import SearchScreen from '../screens/Search'
import PostScreen from '../screens/Post'
import ActivityScreen from '../screens/Activity'
import ProfileScreen from '../screens/Profile'
import CameraScreen from '../screens/Camera'
import MapScreen from '../screens/Map'
import GlobeScreen from '../screens/Globe'
import ExploreScreen from '../screens/Explore'
import BreedScreen from '../screens/BreedPosts'
import EditScreen from '../screens/Signup'
import MatchScreen from '../screens/ResultsList'
import ItsAMatchScreen from '../screens/ItsAMatch'
import MatchesScreen from '../screens/ChatMatch'
import MatchesChatScreen from '../screens/MatchesChat'
import MatchProfileScreen from '../screens/MatchProfile'
import EssentialsScreen from '../screens/ResultsList'
import DogEditScreen from '../screens/DogSignUp'
import CommentScreen from '../screens/Comment'
import ChatScreen from '../screens/Chat'
import MessagesScreen from '../screens/Messages'
import PostViewScreen from '../screens/PostView'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { TouchableOpacity, Image } from 'react-native'

export const HomeNavigator = createAppContainer(createStackNavigator(
  {
    Home: { 
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <Image style={{width: 120, height: 35}} source={require('../assets/logo.jpg')} />,
        /*headerLeft: (
          <TouchableOpacity onPress={() => navigation.navigate('Camera')} >
            <Ionicons style={{marginLeft: 10}} name={'ios-camera'} size={30}/>
          </TouchableOpacity>
        ),
        headerRight: (
          <TouchableOpacity onPress={() => navigation.navigate('Messages')} >
            <Ionicons style={{marginRight: 10}} name={'ios-send'} size={30}/>
          </TouchableOpacity>
        ),
        */
      })
    },
    Comment: {
      screen: CommentScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Comments',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    Map: {
      screen: MapScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Map View',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    Globe: {
      screen: GlobeScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Globe View',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    Messages: {
      screen: MessagesScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Messages',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    Chat: {
      screen: ChatScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Chat',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    Camera: { 
      screen: CameraScreen,
      navigationOptions: {
        header: null
      }
    }
  }
));

HomeNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  if (navigation.state.routes.some(route => route.routeName === 'Camera')) {
    tabBarVisible = false
  }
  if (navigation.state.routes.some(route => route.routeName === 'Map')) {
    tabBarVisible = false
  }
  if (navigation.state.routes.some(route => route.routeName === 'Globe')) {
    tabBarVisible = false
  }
  if (navigation.state.routes.some(route => route.routeName === 'Comment')) {
    tabBarVisible = false
  }
  return {
    tabBarVisible,
  }
}

export const SearchNavigator = createAppContainer(createStackNavigator(
  {
    Search: { 
      screen: SearchScreen,
      navigationOptions: {
        header: null
      }
    },
    Profile: { 
      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Profile',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    Breeds: { 
      screen: BreedScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Breeds',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    }
  }
));

export const PostNavigator = createAppContainer(createStackNavigator(
  {
    Post: { 
      screen: PostScreen,
      navigationOptions: {
        title: 'Post'
      }
    }
  }
));

export const ActivityNavigator = createAppContainer(createStackNavigator(
  {
    Activity: { 
      screen: ActivityScreen,
      navigationOptions: {
        title: 'Activity'
      }
    }
  }
));
export const ExploreNavigator = createAppContainer(createStackNavigator(
  {
    Explore: { 
      screen: GlobeScreen,
      navigationOptions: {
        title: 'Explore'
      }
    },
    ExploreView: { 
      screen: ExploreScreen,
      navigationOptions: {
        title: 'Dogs of Japan'
      }
    }
  }
));

export const EssentialsNavigator = createAppContainer(createStackNavigator(
  {
    Essentials: { 
      screen: EssentialsScreen,
      navigationOptions: {
        title: 'Essentials'
      }
    }
  }

));
export const MatchNavigator = createAppContainer(createStackNavigator(
  {
    Match: { 
      screen: MatchScreen,
      navigationOptions: {
        title: 'Matches'
      }
    },
    MatchProfile: { 
      screen: MatchProfileScreen,
      navigationOptions: {
        title: 'Match Profile'
      }
    },
    MatchesChat: { 
      screen: MatchesChatScreen,
      navigationOptions: {
        title: 'Chat'
      }
    },
    MatchesScreen: { 
      screen: MatchesScreen,
      navigationOptions: {
        title: 'Matches Chat'
      }
    },

    ItsAMatch: { 
      screen: ItsAMatchScreen,
      navigationOptions: {
        title: 'You Matched!'
      }
    },
  }
));

export const ProfileNavigator = createAppContainer(createStackNavigator(
  {
    MyProfile: { 
      screen: ProfileScreen,
      navigationOptions: {
        title: 'My Profile'
      }
    },
    Edit: {
      screen: DogEditScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Edit Profile',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    PostView: {
      screen: PostViewScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Post',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.navigate("Home")} >
            <Ionicons style={{paddingLeft: 10}} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    }
  }
));
