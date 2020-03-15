// Library
import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';

import User from '../../../User';

// Styles
import styles from '../Styles';

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Chats',
  };

  constructor() {
    super();
    this.state = {
      dbRef: firebase.database(),
      users: [],
    };
  }

  componentDidMount() {}

  UNSAFE_componentWillMount() {
    this.state.dbRef.ref('users').on('child_added', val => {
      let person = val.val();
      person.phone = val.key;
      if (person.phone === User.phone) {
        User.name = person.name;
      } else {
        this.setState(prevState => {
          return {
            users: [...prevState.users, person],
          };
        });
      }
    });
  }

  logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  randerRow = ({item}, i) => {
    return (
      <View style={[styles.border.color.gray, styles.border.bottom[1]]}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Chat', item);
            // this.findName(item);
            // Alert.alert(item.phone);
          }}
          style={[styles.padding.padding[20]]}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView>
        {/* <View style={styles.container}> */}
        <FlatList
          data={this.state.users}
          renderItem={this.randerRow}
          keyExtractor={item => item.phone}
        />
        <View style={styles.margin.top[50]}>
          <Text>Home {User.phone}</Text>
          <TouchableOpacity
            onPress={() => this.logout()}
            style={[
              styles.bg.purple,
              styles.shadow.sm,
              styles.custom.boxStyleRight,
              styles.custom.btn,
            ]}>
            <View>
              <Text style={[styles.text.white, styles.text.textCenter]}>
                Sign out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* </View> */}
      </SafeAreaView>
    );
  }
}
