import React from 'react';
import { Ionicons,MaterialCommunityIcons} from '@expo/vector-icons'
import styles from '../styles'
import Login from '../screens/Login'
import HomeScreen from '../screens/Home'
import SearchScreen from '../screens/Search'
import PostScreen from '../screens/Post'
import ActivityScreen from '../screens/Activity'
import ProfileScreen from '../screens/Profile'
import GuestProfileScreen from '../screens/GuestProfile'
import CameraScreen from '../screens/Camera'
import MapScreen from '../screens/Map'
import GlobeScreen from '../screens/Globe'
import ExploreScreen from '../screens/Explore'
import BreedScreen from '../screens/CategoryScreens/BreedCategory'
import WeightScreen from '../screens/CategoryScreens/WeightCategory'
import ColorScreen from '../screens/CategoryScreens/ColorCategory'
import AgeScreen from '../screens/CategoryScreens/AgeCategory'
import GenderScreen from '../screens/CategoryScreens/GenderCategory'
import WeightPostsScreen from '../screens/CategoryScreens/WeightPosts'
import BreedPostsScreen from '../screens/CategoryScreens/BreedPosts'
import ColorPostsScreen from '../screens/CategoryScreens/ColorPosts'
import AgePostsScreen from '../screens/CategoryScreens/AgePosts'
import GenderPostsScreen from '../screens/CategoryScreens/GenderPosts'
import IndividualPostsScreen from '../screens/CategoryScreens/IndividualPosts'
import EditScreen from '../screens/Signup'
import MatchScreen from '../screens/Match'
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
import AdoptListScreen from '../screens/AdoptList'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { TouchableOpacity, Image,Text} from 'react-native'


export const HomeNavigator = createAppContainer(createStackNavigator(
  {
    Home: { 
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <Image style={{width: 120, height: 35}} source={require('../assets/logo.png')} />,
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.navigate('Essentials')} >  
          <MaterialCommunityIcons style ={{marginLeft: 10}} name={'map-marker-outline'} size={32} /> 
          </TouchableOpacity>
        ),
        
        headerRight: (
          <TouchableOpacity onPress={() => navigation.navigate('Activity')} >
            <Ionicons style={{marginRight: 10}} name={'ios-heart-empty'} size={30} />
          </TouchableOpacity>
        ),
      })
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
    DogEdit: {
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
    IndividualPosts: { 
      screen: IndividualPostsScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Single Post',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
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
    Camera: { 
      screen: CameraScreen,
      navigationOptions: {
        header: null
      }
    },  
    Activity: {
      screen: ActivityScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Activity',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    Essentials: {
      screen: EssentialsScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Dog Essentials',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    AdoptList: {
      screen: AdoptListScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Dogs Up For Adoption',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
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
  if (navigation.state.routes.some(route => route.routeName === 'Post')) {
    tabBarVisible = true
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
    IndividualPosts: { 
      screen: IndividualPostsScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Single Post',
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
    },
    Weights: { 
      screen: WeightScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Weights',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    Colors: { 
      screen: ColorScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Colors',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    Ages: { 
      screen: AgeScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Ages',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    Genders: { 
      screen: GenderScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Genders',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    WeightPosts: { 
      screen: WeightPostsScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Weights Posts',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    BreedPosts: { 
      screen: BreedPostsScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Breed Posts',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    ColorPosts: { 
      screen: ColorPostsScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Color Posts',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    AgePosts: { 
      screen: AgePostsScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Age Posts',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    GenderPosts: { 
      screen: GenderPostsScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Gender Posts',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
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

export const ExploreNavigator = createAppContainer(createStackNavigator(
  {
    Explore: { 
      screen: GlobeScreen,
      navigationOptions: {
        header: null
      }
      
    },
    ExploreView: { 
      screen: ExploreScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Explore Page',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
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
    /*header: <AppBar title={navigation.getParam('appBar', {title: ''}).title}/>
    (<TouchableOpacity onPress={() => navigation.navigate('Activity')} >
         <Image style={{width: 50, height: 50,borderRadius: 45,margin: 10,backgroundColor: '#808080'}} source={navigation.getParam('header','')} />
      </TouchableOpacity>)
      */
    Chat: { 
      screen: ChatScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: (<TouchableOpacity onPress={() => navigation.navigate('Profile', {chatDog: navigation.getParam('headerId','')})} >
        <Image style={{width: 33, height: 33,borderRadius: 20,margin: 0,marginLeft: 28,backgroundColor: '#adadad',paddingTop: 0}} source={{uri: navigation.getParam('headerPic','')}} />
        <Text style={{justifyContent: 'center', marginLeft: 28,fontWeight: 'bold'}}>{navigation.getParam('headerTitle','')}</Text>
     </TouchableOpacity>)
      })
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
    ItsAMatch: { 
      screen: ItsAMatchScreen,
      navigationOptions: {
        title: 'You Matched!'
      }
    },
  }
));

export const GuestNavigator = createAppContainer(createStackNavigator(
  {
  GuestProfile: { 
    screen: GuestProfileScreen,
    navigationOptions: {
      title: 'Guest Profile',
      headerLeft: null
    }
  }
}
))

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
    GuestProfile: { 
      screen: GuestProfileScreen,
      navigationOptions: {
        title: 'Willie\'s Profile',
        headerLeft: null
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
    MyIndividualPosts: { 
      screen: IndividualPostsScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'My Single Post',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    },
    IndividualPosts: { 
      screen: IndividualPostsScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Single Post',
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
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
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
  }
));
