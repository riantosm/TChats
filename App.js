// Library
import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack';

// Pages
import Login from './src/screens/Login/Login';
import Home from './src/screens/Home/Home';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen/AuthLoadingScreen';
import Chat from './src/screens/Chat/Chat';

const AppStack = createStackNavigator({Home: Home, Chat: Chat});
const AuthStack = createStackNavigator({Login: Login});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
