import React, { Component } from 'react';
import { Constants } from 'expo';
import { Icon } from 'native-base';
import { TabNavigator } from 'react-navigation';

import HomeScreen from './screens/home/HomeScreen';
import MenuAndOrderNavigator from './screens/order/MenuAndOrderNavigator';
import ProfileScreen from './screens/profile/ProfileScreen';

import SideBar from './sidebar/SideBar';

const MainNavigator = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: () => (
          <Icon name="home" />
        )
      }
    },
    MenuAndOrder: { 
      screen: MenuAndOrderNavigator,      
      navigationOptions: {      
        tabBarLabel: 'Cafe Menu',
        tabBarIcon: () => (
          <Icon name="cafe" />
        )
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {        
        tabBarIcon: () => (
          <Icon name="person" />
        )
      }
    }
  },
  {
    navigationOptions: {
      headerStyle: {
        height: Constants.statusBarHeight + 44,
        paddingTop: Constants.statusBarHeight + 20,
      }
    }
  }
);

export default MainNavigator;