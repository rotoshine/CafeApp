import React from 'react';
import { StackNavigator } from 'react-navigation';

import CafeMenuListScreen from './CafeMenuListScreen';
import OrderScreen from './OrderScreen';

export default StackNavigator(
  {
    CafeMenuList: {
      screen: CafeMenuListScreen
    },
    Order: {
      screen: OrderScreen
    }
  },
  {
    headerMode: 'none'    
  }
);