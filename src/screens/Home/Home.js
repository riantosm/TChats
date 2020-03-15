// Library
import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import firebase from 'firebase';

import User from '../../../User';

// Styles
import styles from '../Styles';

export default class Home extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor() {
    super();
    this.state = {
      dbRef: firebase.database(),
      users: [],
    };
  }

  componentDidMount() {
    this.state.dbRef.ref('users').on('child_added', val => {
      let person = val.val();
      person.phone = val.key;
      if (person.phone === User.phone) {
        User.name = person.name;
        User.image = person.image ? person.image : null;
      } else {
        this.setState(prevState => {
          return {
            users: [...prevState.users, person],
          };
        });
      }
    });
  }

  componentWillUnmount() {
    this.state.dbRef.ref('users').off();
  }

  UNSAFE_componentWillMount() {}

  randerRow = ({item}, i) => {
    return (
      <View style={[styles.border.color.gray, styles.border.bottom[1]]}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Chat', item);
            // this.findName(item);
            // Alert.alert(item.phone);
          }}
          style={[styles.padding.padding[20], styles.flex.directionRow]}>
          <Image
            source={
              item.image
                ? {uri: item.image}
                : require('../../../assets/img/new_user.png')
            }
            style={{width: 50, height: 50}}
          />
          <Text>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container.top}>
        <View style={styles.width.percent[100]}>
          <FlatList
            data={this.state.users}
            renderItem={this.randerRow}
            keyExtractor={item => item.phone}
          />
        </View>
        <View style={styles.margin.top[50]}>
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Profile')}
              style={[
                styles.bg.purple,
                styles.shadow.sm,
                styles.custom.boxStyleRight,
                styles.custom.btn,
              ]}>
              <View>
                <Text style={[styles.text.white, styles.text.textCenter]}>
                  Profile
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
