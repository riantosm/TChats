// Library
import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import User from '../../../User';

// Styles
import {text, font, margin, flex, styles} from '../Styles';

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
      // firebase
      //   .database()
      //   .ref('users/' + User.phone)
      //   .set({name: this.state.name});
      this.props.navigation.navigate('App');
    }
  };

  render() {
    return (
      <>
        <ScrollView>
          <View style={[styles.container, {minHeight: 600}]}>
            <View style={margin.vertical50}>
              <Text
                style={[text.purple, text.center, font.weight, font.size50]}>
                TChat.ID
              </Text>
              <Text style={[text.gray, text.center, font.size15]}>
                Chat Application With Live Location
              </Text>
            </View>
            <TextInput
              placeholder="Phone"
              style={[styles.input, styles.shadow, styles.boxStyleRight]}
              value={this.state.phone}
              onChangeText={this.handleChange('phone')}
              keyboardType={'number-pad'}
            />
            <TextInput
              placeholder="Name"
              style={[styles.input, styles.shadow, styles.boxStyleRight]}
              value={this.state.name}
              onChangeText={this.handleChange('name')}
            />
            <View>
              <TouchableOpacity
                onPress={() => this.submitForm()}
                style={[
                  styles.bgPurple,
                  styles.shadow,
                  styles.boxStyleRight,
                  styles.btn,
                  margin.top20,
                ]}>
                <View>
                  <Text style={[text.white, styles.textCenter, styles.shadow]}>
                    Sign in
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={[margin.top20, margin.bottom50, flex.directionRow]}>
              <Text style={text.gray}>Don't have account? </Text>
              <TouchableOpacity>
                <Text style={[text.purple, font.weight]}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}
