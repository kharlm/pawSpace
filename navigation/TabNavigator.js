import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { HomeNavigator, SearchNavigator, PostNavigator, ActivityNavigator, ProfileNavigator,ExploreNavigator,MatchNavigator,EssentialsNavigator } from './StackNavigator'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

const getScreenRegisteredFunctions = navState => {
  // When we use stack navigators. 
  // Also needed for react-navigation@2
  const { routes, index, params } = navState;

  if (navState.hasOwnProperty('index')) {
    return getScreenRegisteredFunctions(routes[index]);
  }
  // When we have the final screen params
  else {
    return params;
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Home: { 
      screen: HomeNavigator,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({focused}) => (
          <MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} size={32} />
        ) ,
        tabBarOnPress: ({ defaultHandler,navigation}) => {

          if (navigation && navigation.isFocused()) {
            const screenFunctions = getScreenRegisteredFunctions(navigation.state);
  
            if (screenFunctions && typeof screenFunctions.tapOnTabNavigator === 'function') {
              screenFunctions.tapOnTabNavigator()
            }
          }
  
          // Always call defaultHandler()
          defaultHandler();
        },
      } 
    },
    
    Search: { 
      screen: SearchNavigator,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({focused}) => (
          <Ionicons name={focused ? 'md-search' : 'ios-search'} size={32} />
        ) 
      }
    },
    Post: { 
      screen: PostNavigator,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({focused}) => (
          <Ionicons name={focused ? 'ios-add-circle' : 'ios-add-circle-outline'} size={32} />
        ) 
      }
    },
    Match: { 
      screen: MatchNavigator,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({focused}) => (
          <Ionicons  name={focused ? 'ios-bonfire' : 'md-bonfire'} size={32} />
        ) 
      }
    },
    /*Essentials: { 
      screen: EssentialsNavigator,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({focused}) => (
          <MaterialCommunityIcons name={focused ? 'map-marker' : 'map-marker-outline'} size={32} />
        ) 
      }
    },
    */
    /*Activity: { 
      screen: ActivityNavigator,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({focused}) => (
          <Ionicons name={focused ? 'ios-heart': 'ios-heart-empty'} size={32} />
        ) 
      }
    },
    */

   Explore: { 
      screen: ExploreNavigator,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({focused}) => (
          <Ionicons name={focused ? 'ios-globe' : 'md-globe'} size={32} />
        ) 
      }
    },
    
    MyProfile: { 
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({focused}) => (
          <MaterialCommunityIcons name={focused ? 'dog' : 'dog'} size={32} />
        ) 
      }
    }
  }, 
  { 
    tabBarOptions: {
      style: {
        backgroundColor: '#fff',
        paddingVertical: 5,
        height: 55
      }
    }
  }
);

export default createAppContainer(TabNavigator);