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
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';

import User from '../../../User';

// Styles
import styles from '../Styles';

let deviceHeight = Dimensions.get('window').height;

export default class Register extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor() {
    super();
    this.state = {
      phone: '',
      name: '',
      password: '',
      warn: '',
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
    if (this.state.phone.length < 10) {
      this.setState({
        warn: 'Invalid, Phone must > 10 character!',
      });
    } else if (this.state.name.length < 3) {
      this.setState({
        warn: 'Invalid, Name must > 3 character!',
      });
    } else {
      this.setState({
        warn: '',
      });
      Alert.alert('Register successful');
      // await AsyncStorage.setItem('userPhone', this.state.phone);
      User.phone = this.state.phone;
      firebase
        .database()
        .ref('users/' + User.phone)
        .update({name: this.state.name, password: this.state.password});
      this.props.navigation.navigate('Login');
    }
  };

  render() {
    return (
      <>
        <ScrollView>
          <View style={[styles.container.center, {minHeight: deviceHeight}]}>
            <View style={[styles.margin.vertical[50]]}>
              <Image
                source={require('../../../assets/img/logo-tchat.png')}
                style={[
                  styles.width.normal[100],
                  styles.height.normal[100],
                  styles.align.self,
                ]}
              />
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
                    Submit
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
              <Text style={styles.text.gray}></Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={[styles.text.purple, styles.font.weight]}>
                  Back
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}
