import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';

import User from '../../../User';

import styles from '../Styles';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  UNSAFE_componentWillMount() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: 'AIzaSyAcbDUllA32138geQ4ADMaPUXs7b_9ZavI',
      authDomain: 'tchats-e7f77.firebaseapp.com',
      databaseURL: 'https://tchats-e7f77.firebaseio.com',
      projectId: 'tchats-e7f77',
      storageBucket: 'tchats-e7f77.appspot.com',
      messagingSenderId: '69572697987',
      appId: '1:69572697987:web:936fa11a93774e74e220b6',
      measurementId: 'G-KXGR3J3T6L',
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    User.phone = await AsyncStorage.getItem('userPhone');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(User.phone ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <>
        <StatusBar backgroundColor="#5a52a5" barStyle="light-content" />
        <View style={[styles.container.center, {backgroundColor: '#fff'}]}>
          <Image
            source={require('../../../assets/img/logo-tchat.png')}
            style={[styles.width.normal[100], styles.height.normal[100]]}
          />
          <ActivityIndicator color="#5a52a5" />
        </View>
      </>
    );
  }
}

export default AuthLoadingScreen;
