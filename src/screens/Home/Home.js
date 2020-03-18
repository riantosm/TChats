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

  constructor() {
    super();
    this.state = {
      dbRef: firebase.database(),
      users: [],
      active: false,
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
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
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
                onPress={() => this.props.navigation.navigate('Map')}>
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
              <FlatList
                data={this.state.users}
                renderItem={this.randerRow}
                keyExtractor={item => item.phone}
              />
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
          <Button style={{backgroundColor: '#3B5998'}}>
            <Image
              source={require('../../../assets/img/user.png')}
              style={styles.custom.imgIconSm}
            />
          </Button>
          <Button style={{backgroundColor: '#34A34F'}}>
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
