// Library
import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import firebase from 'firebase';

import User from '../../../User';

// Styles
import styles from '../Styles';

export default class WaitingFriends extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Friend Request',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#5a52a5',
      },
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      searchPhone: '',
      userAll: props.navigation.getParam('usersA'),
      userRequest: props.navigation.getParam('usersR'),
    };
  }

  componentDidMount() {}

  confirm = async phoneSrch => {
    console.log(phoneSrch);
    let updates = {};
    let messageAdd = {
      status: '2',
    };
    let messageVer = {
      status: '2',
    };
    updates['friend/' + User.phone + '/' + phoneSrch] = messageAdd;
    updates['friend/' + phoneSrch + '/' + User.phone] = messageVer;
    firebase
      .database()
      .ref()
      .update(updates);
    this.props.navigation.navigate('App');
    Alert.alert(`Now you are friends with ${phoneSrch}.`);
  };

  randerRow = ({item, index}) => {
    for (let x = 1; x <= this.state.userRequest.length; x++) {
      x--;
      if (
        this.state.userAll[index]['phone'] ===
        this.state.userRequest[x]['phone']
      ) {
        return (
          <>
            <View style={[styles.width.percent[90], styles.align.self]}>
              <View style={[styles.margin.vertical[10]]}>
                <View
                  style={[
                    styles.custom.boxStyleRight,
                    styles.bg.white,
                    styles.shadow.sm,
                    styles.flex.directionRow,
                    styles.padding.padding[20],
                  ]}>
                  <Image
                    source={
                      item.image
                        ? {uri: item.image}
                        : require('../../../assets/img/new_user.png')
                    }
                    style={[
                      styles.custom.imgFriend,
                      styles.custom.boxStyleRight,
                    ]}
                  />
                  <View
                    style={[
                      styles.padding.horizontal[10],
                      styles.container.left,
                    ]}>
                    <Text
                      style={[
                        styles.font.size15,
                        styles.text.purple,
                        styles.font.weight,
                      ]}>
                      {item.name}
                    </Text>
                    <Text style={[styles.text.gray]}>{item.phone}</Text>
                  </View>
                  <View
                    style={[
                      styles.padding.horizontal[10],
                      styles.container.right,
                    ]}>
                    <TouchableOpacity
                      onPress={() => this.confirm(item.phone)}
                      style={[
                        styles.bg.purple,
                        styles.shadow.sm,
                        styles.custom.boxStyleRight,
                        styles.padding.vertical[10],
                        styles.padding.horizontal[20],
                      ]}>
                      <View>
                        <Text style={[styles.text.white, styles.text.center]}>
                          Confirm
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </>
        );
      } else {
        <View
          style={[
            styles.flex.directionRow,
            styles.align.self,
            styles.margin.vertical[50],
          ]}>
          <Text style={styles.text.purple}>No Request.</Text>
        </View>;
      }
      x++;
    }
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.userAll}
          renderItem={this.randerRow}
          keyExtractor={item => item.phone}
          ListEmptyComponent={
            <>
              <View
                style={[
                  styles.flex.directionRow,
                  styles.align.self,
                  styles.margin.vertical[50],
                ]}>
                <Text style={styles.text.purple}>No Request.</Text>
              </View>
            </>
          }
        />
      </View>
    );
  }
}
