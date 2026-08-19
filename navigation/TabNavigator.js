import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import HomeNavigator from './HomeNavigator';
import SearchNavigator from './SearchNavigator';
import ComingSoon from '../screens/ComingSoon';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabel: '',
        tabBarStyle: {
          backgroundColor: '#fff',
          paddingVertical: 5,
          height: 55,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'search' : 'search-outline'} size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={ComingSoon}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="Match"
        component={ComingSoon}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'bonfire' : 'bonfire-outline'} size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ComingSoon}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'globe' : 'globe-outline'} size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={ComingSoon}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="dog" size={32} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
