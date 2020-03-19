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

export default class AddFriends extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Add Friends',
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
      userAll: props.navigation.getParam('users'),
      userFriends: props.navigation.getParam('friends'),
      userSearch: [],
      searchPhoneFind: false,
      isFriend: false,
    };
  }

  componentDidMount() {
    // console.log(this.state.userFriends);
  }

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  handleSubmit() {
    let friend = this.state.userFriends;
    let search = this.state.userAll;

    friend = friend
      .filter(item => item.phone == this.state.searchPhone)
      .map(({name, phone}) => ({name, phone}));

    search = search
      .filter(item => item.phone == this.state.searchPhone)
      .map(({image, name, phone}) => ({image, name, phone}));

    console.log(friend);

    if (friend[0] === undefined) {
      this.setState({
        userSearch: search,
        searchPhoneFind: true,
        isFriend: false,
      });
    } else {
      this.setState({
        userSearch: search,
        searchPhoneFind: true,
        isFriend: true,
      });
    }
  }

  addFriend = async phoneSrch => {
    let updates = {};
    let messageAdd = {
      status: '0',
    };
    let messageVer = {
      status: '1',
    };
    updates['friend/' + User.phone + '/' + phoneSrch] = messageAdd;
    updates['friend/' + phoneSrch + '/' + User.phone] = messageVer;
    firebase
      .database()
      .ref()
      .update(updates);
    this.back();
    Alert.alert('Waiting for confirmation from your friends.');
  };

  back() {
    this.setState({
      searchPhone: '',
      userSearch: [],
      searchPhoneFind: false,
    });
  }

  randerRow = ({item}, i) => {
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
                style={[styles.custom.imgFriend, styles.custom.boxStyleRight]}
              />
              <View
                style={[styles.padding.horizontal[10], styles.container.left]}>
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
                style={[styles.padding.horizontal[10], styles.container.right]}>
                {this.state.isFriend ? (
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Chat', item)}
                    style={[
                      styles.bg.purple,
                      styles.shadow.sm,
                      styles.custom.boxStyleRight,
                      styles.padding.vertical[10],
                      styles.padding.horizontal[20],
                    ]}>
                    <View>
                      <Text style={[styles.text.white, styles.text.center]}>
                        Chat
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => this.addFriend(item.phone)}
                    style={[
                      styles.bg.purple,
                      styles.shadow.sm,
                      styles.custom.boxStyleRight,
                      styles.padding.vertical[10],
                      styles.padding.horizontal[20],
                    ]}>
                    <View>
                      <Text style={[styles.text.white, styles.text.center]}>
                        Add
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  render() {
    return (
      <>
        <ScrollView>
          <View style={[styles.container.top, styles.margin.vertical[50]]}>
            <View style={[styles.width.percent[100]]}>
              <View style={[styles.width.percent[90], styles.align.self]}>
                <Text style={[styles.text.center]}>Search</Text>
                <TextInput
                  placeholder="Phone"
                  keyboardType={'number-pad'}
                  value={this.state.searchPhone}
                  style={[
                    styles.custom.input,
                    styles.custom.boxStyleRight,
                    styles.margin.vertical[10],
                    styles.shadow.sm,
                    styles.text.center,
                  ]}
                  onChangeText={this.handleChange('searchPhone')}
                />
                <View
                  style={[styles.container.top, styles.margin.vertical[10]]}>
                  <TouchableOpacity
                    onPress={() => this.handleSubmit()}
                    style={[
                      styles.bg.purple,
                      styles.shadow.sm,
                      styles.custom.boxStyleRight,
                      styles.padding.vertical[15],
                      styles.padding.horizontal[30],
                    ]}>
                    <View>
                      <Text style={[styles.text.white, styles.text.center]}>
                        Search
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {this.state.searchPhoneFind ? (
                <FlatList
                  data={this.state.userSearch}
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
                        <Text style={styles.text.purple}>Phone not found!</Text>
                      </View>
                    </>
                  }
                />
              ) : (
                <Text></Text>
              )}
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}
