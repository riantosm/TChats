// Library
import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';

import User from '../../../User';

// Styles
import styles from '../Styles';

let deviceHeight = Dimensions.get('window').height;

export default class Login extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor() {
    super();
    this.state = {
      phone: '',
      password: '',
      warn: '',
      login: false,
    };
  }

  componentDidMount() {}

  handleCancel() {
    this.setState({
      phone: '',
      password: '',
      warn: '',
      login: false,
    });
  }

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
    if (this.state.phone.length < 1) {
      this.setState({warn: 'Please enter the phone number and password!'});
    } else if (this.state.password.length < 1) {
      this.setState({warn: 'Please enter the phone number and password!'});
    } else {
      // alert(this.state.phone + '\n' + this.state.name);
      // await AsyncStorage.setItem('userPhone', this.state.phone);
      // firebase
      //   .database()
      //   .ref('users/' + User.phone)
      //   .update({name: this.state.name});
      // this.props.navigation.navigate('App');
      firebase
        .database()
        .ref('users')
        .child(this.state.phone)
        .on('child_added', value => {
          // this.setState(prevState => {
          //   return {
          //     thisUser: [...prevState.thisUser, value.val()],
          //   };
          // });
          if (this.state.password === value.val()) {
            // console.log(value.val());
            User.phone = this.state.phone;
            this.props.navigation.navigate('App');
          } else {
            this.setState({
              warn: 'Incorrect phone number or password!',
              login: true,
            });
          }
        });
      if (this.state.login) {
        this.setState({warn: 'Incorrect phone number or password!'});
      } else {
        await AsyncStorage.setItem('userPhone', this.state.phone);
      }
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
                Chat Application Featured Live Location
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
              placeholder="Password"
              style={[
                styles.custom.input,
                styles.shadow.sm,
                styles.custom.boxStyleRight,
                styles.width.percent[90],
                styles.margin.bottom[10],
              ]}
              value={this.state.password}
              onChangeText={this.handleChange('password')}
              secureTextEntry={true}
            />
            <Text
              style={[
                styles.margin.top[10],
                styles.text.purple,
                styles.font.weight,
              ]}>
              {this.state.warn}
            </Text>
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
              <TouchableOpacity
                onPress={() => {
                  this.handleCancel();
                  this.props.navigation.navigate('Register');
                }}>
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
