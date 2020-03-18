// Library
import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack';

// Pages
import Login from './src/screens/Login/Login';
import Home from './src/screens/Home/Home';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen/AuthLoadingScreen';
import Chat from './src/screens/Chat/Chat';
import Profile from './src/screens/Profile/Profile';
import Map from './src/screens/Map/Map';
import Register from './src/screens/Register/Register';
import AddFriends from './src/screens/Home/AddFriends';
import WaitingFriends from './src/screens/Home/WaitingFriends';

const AppStack = createStackNavigator({
  Home: Home,
  AddFriends: AddFriends,
  WaitingFriends: WaitingFriends,
  Chat: Chat,
  Map: Map,
  Profile: Profile,
});
const AuthStack = createStackNavigator({Login: Login, Register: Register});

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
