import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Constants } from 'expo';
import { DrawerNavigator } from 'react-navigation';

import HomeScreen from './screens/home/HomeScreen';
import MenuAndOrderNavigator from './screens/order/MenuAndOrderNavigator';
import ProfileScreen from './screens/profile/ProfileScreen';
import SideBar from './sidebar/SideBar';

const MainNavigator = DrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    MenuAndOrder: { 
      screen: MenuAndOrderNavigator 
    },
    Profile: {
      screen: ProfileScreen
    }
  },
  {
    contentComponent: (props) => <SideBar {...props} />,
    navigationOptions: {
      headerStyle: {
        height: Constants.statusBarHeight + 56,
        paddingTop: Constants.statusBarHeight + StatusBar.currentHeight
      }
    }
  }
);

export default MainNavigator;