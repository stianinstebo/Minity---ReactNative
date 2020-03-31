//This is an example code for Bottom Navigation//
import React from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
//import all the basic component we have used
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './pages/HomeScreen.js';
//import Ionicons to show the icon for bottom options

//For React Navigation 3+
//import {
//  createStackNavigator,
//  createBottomTabNavigator,
//  createAppContainer,
//} from 'react-navigation';

//For React Navigation 4+
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './pages/HomeScreen';
import SettingsScreen from './pages/SettingsScreen';
import DetailsScreen from './pages/DetailsScreen';
import ProfileScreen from './pages/ProfileScreen';
import ScannerScreen from './pages/ScannerScreen';
import CheckInScreen from './pages/CheckInScreen';
const HomeStack = createStackNavigator(
  {
    //Definition of Navigaton from home screen
    Home: { screen: HomeScreen },
    Details: { screen: DetailsScreen },
    CheckIn: {screen: CheckInScreen},
  },
  {
    defaultNavigationOptions: {
        
        
       

      headerStyle: {
        backgroundColor: '#252835',
      },
      headerTintColor: '#FFFFFF',
      title: 'Minity',
    },
  }
);

const ScannerStack = createStackNavigator(
  {
    //Definition of Navigaton from setting screen
    Home: { screen: ScannerScreen },
    CheckIn: {screen: CheckInScreen},
  },
  {
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: '#252835',
      },
      headerTintColor: '#FFFFFF',
      title: 'Minity',
      //Header title
    },
  }
);

const SettingsStack = createStackNavigator(
  {
    //Definition of Navigaton from setting screen
    Settings: { screen: SettingsScreen },
    Details: { screen: DetailsScreen },
    
    Profile: { screen: ProfileScreen },
  },
  {
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: '#252835',
      },
      headerTintColor: '#FFFFFF',
      title: 'Profile',
      //Header title
    },
  }
);



const App = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Settings: { screen: SettingsStack },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
        cardStyle: { opacity: 1 },
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        let iconSize;
        if (routeName === 'Home') {
          iconName = `ios-list`;
          iconSize = 25;
        } else if (routeName === 'Scanner') {
          iconName = `ios-add-circle`;
          iconSize = 25;
        } else if (routeName === 'Settings') {
          iconName = `ios-person`;
          iconSize = 25;
        }
        return <IconComponent name={iconName} size={iconSize} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#252835',
      inactiveTintColor: '#ccc',
        showLabel: false,
        currentTabIndex: 1
    }
  }
);

const styles = StyleSheet.create ({
    headerItems: {
      paddingRight: 20,
    },
});
export default createAppContainer(App);

