// Library
import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';

import User from '../../../User';

// Styles
import styles from '../Styles';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: User.name,
    };
  }

  componentDidMount() {}

  logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  changeName = async () => {
    if (this.state.name.length < 3) {
      Alert.alert('kurang');
    } else {
      if (User.name !== this.state.name) {
        User.name = this.state.name;
        this.updateUser();
      }
    }
  };

  updateUser = () => {
    firebase
      .database()
      .ref('users')
      .child(User.phone)
      .set({name: this.state.name});
    Alert.alert('Saved');
  };

  render() {
    return (
      <>
        <View style={[styles.container.top, styles.padding.vertical[70]]}>
          <TouchableOpacity>
            <Image
              style={[styles.width.normal[100], styles.height.normal[100]]}
              source={require('../../../assets/img/new_user.png')}
            />
          </TouchableOpacity>
          <Text style={styles.margin.top[20]}>{User.phone}</Text>
          <TextInput
            value={this.state.name}
            onChangeText={this.handleChange('name')}
            style={[
              styles.custom.input,
              styles.width.percent[90],
              styles.custom.boxStyleRight,
              styles.shadow.sm,
              styles.margin.top[10],
            ]}
          />
          <TouchableOpacity
            onPress={() => this.changeName()}
            style={[
              styles.bg.purple,
              styles.shadow.sm,
              styles.custom.boxStyleRight,
              styles.custom.btn,
              styles.margin.top[50],
            ]}>
            <View>
              <Text style={[styles.text.white, styles.text.textCenter]}>
                Change Name
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.logout()}
            style={[
              styles.bg.purple,
              styles.shadow.sm,
              styles.custom.boxStyleRight,
              styles.custom.btn,
              styles.margin.vertical[50],
            ]}>
            <View>
              <Text style={[styles.text.white, styles.text.textCenter]}>
                Sign out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
