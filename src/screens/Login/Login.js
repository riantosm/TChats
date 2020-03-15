// Library
import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';

import User from '../../../User';

// Styles
import styles from '../Styles';

let deviceHeight = Dimensions.get('window').height;

export default class App extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor() {
    super();
    this.state = {
      phone: '',
      name: '',
    };
  }

  componentDidMount() {}

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  UNSAFE_componentWillMount() {
    AsyncStorage.getItem('userPhone').then(val => {
      if (val) {
        this.setState({phone: val});
      }
    });
  }

  submitForm = async () => {
    if (this.state.phone.length < 3) {
      alert('Error,Phone must < 3');
    } else if (this.state.name.length < 3) {
      alert('Error,Name must < 3');
    } else {
      // alert(this.state.phone + '\n' + this.state.name);
      await AsyncStorage.setItem('userPhone', this.state.phone);
      User.phone = this.state.phone;
      firebase
        .database()
        .ref('users/' + User.phone)
        .set({name: this.state.name});
      this.props.navigation.navigate('App');
    }
  };

  render() {
    return (
      <>
        <ScrollView>
          <View style={[styles.container.center, {minHeight: deviceHeight}]}>
            <View style={[styles.margin.vertical[50]]}>
              <Text
                style={[
                  styles.text.purple,
                  styles.text.center,
                  styles.font.weight,
                  styles.font.size50,
                ]}>
                TChat.ID
              </Text>
              <Text
                style={[
                  styles.text.gray,
                  styles.text.center,
                  styles.font.size15,
                ]}>
                Chat Application With Live Location
              </Text>
            </View>
            <TextInput
              placeholder="Phone"
              style={[
                styles.custom.input,
                styles.shadow.sm,
                styles.custom.boxStyleRight,
                styles.width.percent[90],
                styles.margin.bottom[10],
              ]}
              value={this.state.phone}
              onChangeText={this.handleChange('phone')}
              keyboardType={'number-pad'}
            />
            <TextInput
              placeholder="Name"
              style={[
                styles.custom.input,
                styles.shadow.sm,
                styles.custom.boxStyleRight,
                styles.width.percent[90],
                styles.margin.bottom[10],
              ]}
              value={this.state.name}
              onChangeText={this.handleChange('name')}
            />
            <View>
              <TouchableOpacity
                onPress={() => this.submitForm()}
                style={[
                  styles.bg.purple,
                  styles.shadow.md,
                  styles.custom.boxStyleRight,
                  styles.custom.btn,
                  styles.margin.top[20],
                ]}>
                <View>
                  <Text style={[styles.text.white, styles.text.center]}>
                    Sign in
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.margin.top[20],
                styles.margin.bottom[50],
                styles.flex.directionRow,
              ]}>
              <Text style={styles.text.gray}>Don't have account? </Text>
              <TouchableOpacity>
                <Text style={[styles.text.purple, styles.font.weight]}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}
