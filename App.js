import React from 'react';

import {
  createSwitchNavigator, createStackNavigator
} from 'react-navigation';

import Login from './app/res/components/Auth/Login';
import Scanner from './app/res/components/Scanner';
import UserDetails from './app/res/components/UserDetails';
import MascotaDetails from './app/res/components/MascotaDetails';
import AuthLoadingScreen from './app/res/components/Auth/AuthLoadingScreen';
import WithoutNetwork from './app/res/components/WithoutNetwork';

const AppAuth = createStackNavigator(
  {
    Scanner: { screen: Scanner },
    UserDetails: { screen: UserDetails },
    MascotaDetails: { screen: MascotaDetails },
    WithoutNetwork: { screen: WithoutNetwork }
  },
  {
    initialRouteName: 'Scanner',
    navigationOptions: {
      headerTintColor: '#009688',
    },
  }
);

const AppGuest = createStackNavigator(
  {
    Login: { screen: Login },
    WithoutNetwork: { screen: WithoutNetwork }
  }
);

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppAuth,
    Auth: AppGuest,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
