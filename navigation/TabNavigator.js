import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { HomeNavigator, SearchNavigator, PostNavigator, ActivityNavigator, ProfileNavigator,ExploreNavigator,MatchNavigator } from './StackNavigator'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

const TabNavigator = createBottomTabNavigator(
  {
    Home: { 
      screen: HomeNavigator,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({focused}) => (
          <MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} size={32} />
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
    Activity: { 
      screen: ActivityNavigator,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({focused}) => (
          <Ionicons name={focused ? 'ios-heart' : 'ios-heart-empty'} size={32} />
        ) 
      }
    },

  /* Explore: { 
      screen: ExploreNavigator,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({focused}) => (
          <Ionicons name={focused ? 'ios-globe' : 'md-globe'} size={32} />
        ) 
      }
    },
    */
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