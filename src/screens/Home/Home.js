// Library
import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import User from '../../../User';

// Styles
import {text, font, margin, flex, styles} from '../Styles';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View>
        <Text>Home {User.phone}</Text>
        <View>
          <TouchableOpacity
            onPress={() => this.logout()}
            style={[
              styles.bgPurple,
              styles.shadow,
              styles.boxStyleRight,
              styles.btn,
              margin.top20,
            ]}>
            <View>
              <Text style={[text.white, styles.textCenter, styles.shadow]}>
                Sign out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
