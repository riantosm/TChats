// Library
import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Fab, Button, Icon} from 'native-base';
import firebase from 'firebase';

import User from '../../../User';

// Styles
import styles from '../Styles';

export default class Home extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      dbRef: firebase.database(),
      users: [],
      friends: [],
      friendsPhone: [],
      friendsRequest: [],
      active: false,
      thiss: props.navigation.getParam('par'),
    };
  }

  componentWillReceiveProps() {
    this.cek();
  }

  componentDidMount() {
    this.getUserAll();
    this.getUserMyFriend();
    this.getUserMyRequest();
  }

  cek() {
    this.setState({
      users: [],
      friends: [],
      friendsPhone: [],
      friendsRequest: [],
      active: false,
    });
    this.getUserAll();
    this.getUserMyFriend();
    this.getUserMyRequest();
    // for (let x = 1; x <= this.state.friends.length; x++) {
    //   x--;
    //   if (this.state.friends[x]['status'] === '2') {
    //     // console.warn(this.state.friends[x]['phone']);
    //     // this.setState({
    //     //   friendsPhone: this.state.friends[x]['phone'],
    //     // });
    //     this.setState(prevState => {
    //       return {
    //         friendsPhone: [
    //           ...prevState.friendsPhone,
    //           this.state.friends[x]['phone'],
    //         ],
    //       };
    //     });
    //   }
    //   x++;
    // }

    // for (let x = 1; x <= this.state.users.length; x++) {
    //   x--;
    //   for (let y = 1; y <= this.state.friends.length; y++) {
    //     y--;
    //     if (this.state.users[x]['phone'] === this.state.friends[y]['phone']) {
    //       console.log(
    //         this.state.users[x]['phone'],
    //         ' dan ',
    //         this.state.friends[y]['phone'],
    //       );
    //     }
    //     y++;
    //   }
    //   x++;
    // }

    // console.log(this.state.friends.length);

    // console.warn(this.state.friends[0]['status']);
    // console.warn(this.state.users[0]['phone']);
  }

  getUserAll() {
    this.state.dbRef.ref('users').on('child_added', val => {
      let person = val.val();
      person.phone = val.key;
      if (person.phone === User.phone) {
        User.name = person.name;
        User.password = person.password;
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

  getUserMyFriend() {
    this.state.dbRef
      .ref('friend')
      .child(User.phone)
      .on('child_added', val => {
        let person = val.val();
        person.phone = val.key;
        // if (person.phone === User.phone) {
        //   User.name = person.name;
        //   User.password = person.password;
        //   User.image = person.image ? person.image : null;
        // } else {
        if (person['status'] === '2') {
          this.setState(prevState => {
            return {
              friends: [...prevState.friends, person],
            };
          });
        }
        // }
      });
  }

  getUserMyRequest() {
    this.state.dbRef
      .ref('friend')
      .child(User.phone)
      .on('child_added', val => {
        let person = val.val();
        person.phone = val.key;
        // if (person.phone === User.phone) {
        //   User.name = person.name;
        //   User.password = person.password;
        //   User.image = person.image ? person.image : null;
        // } else {
        if (person['status'] === '1') {
          console.log(person);
          this.setState(prevState => {
            return {
              friendsRequest: [...prevState.friendsRequest, person],
            };
          });
        }
        // }
      });
  }

  randerRow = ({item, index}) => {
    // for (let x = 1; x <= this.state.friends.length; x++) {
    //   console.warn(this.state.users[x]);
    //   console.warn('----');
    // }

    // console.log(item['phone']);
    // console.log(this.state.friends[0]);

    // this.state.friends[index]
    //   ? (item['phone'] == this.state.friends[index]['phone']
    //       ? console.log('sama')
    //       : console.log('tidak'),
    //     console.log(this.state.friends[index]['phone']),
    //     console.log(this.state.friends[index]))
    //   : console.log();

    // let text = this.state.friends[0]['phone'];
    // console.log(this.state.friends[0]['phone']);
    for (let y = 1; y <= this.state.friends.length; y++) {
      y--;
      if (this.state.users[index]['phone'] === this.state.friends[y]['phone']) {
        return (
          <>
            <View style={[styles.width.percent[90], styles.align.self]}>
              <TouchableOpacity
                style={[styles.margin.vertical[10]]}
                onPress={() => this.props.navigation.navigate('Chat', item)}>
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
                </View>
              </TouchableOpacity>
            </View>
          </>
        );
      }
      y++;
    }
  };

  render() {
    return (
      <>
        <ScrollView>
          <View
            style={[styles.custom.header, styles.bg.purple, styles.shadow.md]}>
            <Text style={styles.custom.title}>TChat.ID</Text>
            <View style={styles.custom.menu}>
              <TouchableOpacity
                style={[
                  styles.custom.boxStyleRight,
                  styles.custom.boxMenu,
                  styles.shadow.md,
                ]}
                onPress={() => this.props.navigation.navigate('Home')}>
                <View>
                  <Image
                    source={require('../../../assets/img/friends.png')}
                    style={[
                      styles.custom.imgIcon,
                      styles.align.self,
                      styles.custom.boxStyleLeft,
                      {borderRadius: 10},
                    ]}
                  />
                  <Text
                    style={[
                      styles.text.purple,
                      styles.text.center,
                      styles.font.weight,
                    ]}>
                    Friends
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.custom.boxStyleMid,
                  styles.custom.boxMenu,
                  styles.shadow.md,
                ]}
                onPress={() =>
                  this.props.navigation.navigate('Map', {
                    userFriends: this.state.friends,
                    userAll: this.state.users,
                  })
                }>
                <View>
                  <Image
                    source={require('../../../assets/img/location.png')}
                    style={[styles.custom.imgIcon, styles.align.self]}
                  />
                  <Text
                    style={[
                      styles.text.purple,
                      styles.text.center,
                      styles.font.weight,
                    ]}>
                    Maps
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.custom.boxStyleLeft,
                  styles.custom.boxMenu,
                  styles.shadow.md,
                ]}
                onPress={() => this.props.navigation.navigate('Profile')}>
                <View>
                  <Image
                    source={require('../../../assets/img/user.png')}
                    style={[styles.custom.imgIcon, styles.align.self]}
                  />
                  <Text
                    style={[
                      styles.text.purple,
                      styles.text.center,
                      styles.font.weight,
                    ]}>
                    Profile
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.custom.body, styles.container.top]}>
            <View style={styles.width.percent[100]}>
              {this.state.friends.length > 0 ? (
                <FlatList
                  data={this.state.users}
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
                        <Text style={styles.text.purple}>
                          You no have friends, please{' '}
                        </Text>
                        <TouchableOpacity>
                          <Text
                            style={[styles.text.purple, styles.font.weight]}>
                            add here
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  }
                />
              ) : (
                <View
                  style={[
                    styles.flex.directionRow,
                    styles.align.self,
                    styles.margin.vertical[50],
                  ]}>
                  <Text style={styles.text.purple}>
                    You no have friends, please{' '}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('AddFriends', {
                        users: this.state.users,
                      })
                    }>
                    <Text style={[styles.text.purple, styles.font.weight]}>
                      add here
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity
                onPress={() => this.cek()}
                style={styles.margin.vertical[20]}>
                <Text
                  style={[
                    styles.text.center,
                    styles.text.purple,
                    styles.font.weight,
                  ]}>
                  Refresh
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={styles.bg.purple}
          position="bottomRight"
          onPress={() => this.setState({active: !this.state.active})}>
          <View>
            <Image
              source={require('../../../assets/img/add-user.png')}
              style={[styles.custom.imgIconSm, styles.align.self]}
            />
            <Text
              style={[
                styles.text.white,
                styles.font.size8,
                styles.text.center,
              ]}>
              Add Friends
            </Text>
          </View>
          <Button
            style={{backgroundColor: '#3B5998'}}
            onPress={() =>
              this.props.navigation.navigate('WaitingFriends', {
                usersA: this.state.users,
                usersR: this.state.friendsRequest,
              })
            }>
            <Image
              source={require('../../../assets/img/user.png')}
              style={styles.custom.imgIconSm}
            />
          </Button>
          <Button
            style={{backgroundColor: '#34A34F'}}
            onPress={() =>
              this.props.navigation.navigate('AddFriends', {
                users: this.state.users,
                friends: this.state.friends,
              })
            }>
            <Image
              source={require('../../../assets/img/add-user.png')}
              style={styles.custom.imgIconSm}
            />
          </Button>
        </Fab>
      </>
    );
  }
}
