import AppNavigator from './AppNavigator';
import { StackNavigator } from 'react-navigation';

import LoginScreen from '../screens/login/LoginScreen';

const AppMainNavigator = StackNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    App: {
      screen: AppNavigator
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Login'    
  }
);

export default AppMainNavigator;