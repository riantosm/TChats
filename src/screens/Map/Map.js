// Library
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Circle,
  Polygon,
} from 'react-native-maps';

import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import Carousel from 'react-native-snap-carousel';
import {Thumbnail} from 'native-base';
import firebase from 'firebase';

import User from '../../../User';

// Styles
import styles from '../Styles';

export default class Map extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      dbRef: firebase.database(),
      friends: [],
      users: [],
      markers: [],
      modalVisible: false,
      timer: 30000,
      coordinates: [],
      coordinate: [],
    };
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
            coordinates: [...prevState.coordinates, person],
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

  yourFriends() {
    // console.log(this.state.coordinates.length);
    for (let x = 1; x <= this.state.coordinates.length; x++) {
      x--;
      for (let y = 1; y <= this.state.friends.length; y++) {
        y--;
        if (
          this.state.coordinates[x]['phone'] === this.state.friends[y]['phone']
        ) {
          // console.log(this.state.coordinates[x]);
          this.setState(prevState => {
            return {
              users: [...prevState.users, this.state.coordinates],
            };
          });
        }
        y++;
      }
      x++;
    }
    // console.log('user: ', this.state.users);
  }

  cek() {
    this.setState({
      friends: this.state.friends,
      // users: this.state.users,
      markers: this.state.markers,
      timer: 30000,
    });
  }

  myMarker() {
    this.cek();
    Geolocation.getCurrentPosition(position => {
      this._map.animateToRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0,
        longitudeDelta: 0.01,
      });
    });
  }

  updateMyLocation() {
    // console.log(this.state.timer);
    Geolocation.getCurrentPosition(position => {
      firebase
        .database()
        .ref('users')
        .child(User.phone)
        .update({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
    });
    this.cek();
    // console.log('update');
  }

  onCarouselItemChange = index => {
    let location = this.state.coordinates[index];

    this._map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0,
      longitudeDelta: 0.01,
    });

    // this.state.markers[index].showCallout();
  };

  onMakerPressed = (location, index) => {
    this._map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0,
      longitudeDelta: 0.01,
    });
    this._carousel.snapToItem(index);
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount = async () => {
    await this.getUserAll();
    await this.cek();
    await this.requestLocationPermission();
    await this.getUserMyFriend();
    await this.yourFriends();
    // console.log(this.state.users);
    // console.log(this.state.coordinates);
  };

  UNSAFE_componentWillUpdate() {
    this._interval = setInterval(() => {
      //   this.setState({
      //     second: this.state.second + 1,
      //  })
      this.updateMyLocation();
      // console.log(this.state.coordinates);
    }, this.state.timer);
    // console.log(this.state.coordinate);
  }

  requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('iPhone: ' + response);
      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    } else {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('Android: ' + response);
      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    }
  };

  locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(position => {
      // console.log(JSON.stringify(position));
      let initialPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0,
        longitudeDelta: 0.02,
      };
      let myInitialPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      this.setState({
        initialPosition,
        myInitialPosition,
      });
    });
  };

  renderCarouseItem = ({item, index}) => {
    for (let x = 1; x <= this.state.coordinates.length; x++) {
      x--;
      for (let y = 1; y <= this.state.friends.length; y++) {
        y--;
        if (this.state.coordinates[x]['phone'] === item.phone) {
          return (
            <TouchableWithoutFeedback>
              <View style={[styles.custom.cardContainer]}>
                <View
                  style={[
                    styles.custom.boxStyleMid,
                    styles.padding.padding[20],
                    styles.margin.margin[10],
                    styles.bg.white,
                    styles.flex.directionRow,
                    styles.shadow.md,
                  ]}>
                  <Image
                    style={[
                      styles.custom.cardImage,
                      styles.custom.boxStyleRight,
                      styles.shadow.md,
                    ]}
                    source={{uri: this.state.coordinates[x].image}}
                  />
                  <View
                    style={[
                      styles.width.percent[100],
                      styles.padding.horizontal[20],
                    ]}>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.font.size20,
                        styles.text.purple,
                        styles.font.weight,
                        styles.width.percent[60],
                      ]}>
                      {this.state.coordinates[x]['name']}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.font.size15,
                        styles.text.gray,
                        styles.width.percent[60],
                      ]}>
                      {this.state.coordinates[x]['phone']}
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.container.top,
                    styles.flex.directionRow,
                    styles.width.percent[95],
                  ]}>
                  <TouchableOpacity
                    onPress={() => {
                      this.onMakerPressed(this.state.coordinates[x], index);
                    }}
                    style={[
                      styles.bg.purple,
                      styles.shadow.md,
                      styles.custom.boxStyleRight,
                      styles.padding.vertical[15],
                      styles.margin.margin[10],
                      styles.width.percent[45],
                      styles.align.selfLeft,
                    ]}>
                    <View>
                      <Text style={[styles.text.white, styles.text.center]}>
                        Location
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate(
                        'Chat',
                        this.state.coordinates[x],
                      )
                    }
                    style={[
                      styles.bg.purple,
                      styles.shadow.md,
                      styles.custom.boxStyleLeft,
                      styles.padding.vertical[15],
                      styles.margin.margin[10],
                      styles.width.percent[45],
                      styles.align.selfLeft,
                    ]}>
                    <View>
                      <Text style={[styles.text.white, styles.text.center]}>
                        Chat
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        }
        y++;
      }
      x++;
    }
  };

  render() {
    return (
      <>
        <StatusBar backgroundColor="#5a52a5" barStyle="light-content" />
        <TouchableOpacity
          style={[styles.custom.network, styles.bg.purple, styles.shadow.md]}
          onPress={() => {
            this.myMarker();
            this.updateMyLocation();
          }}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../../assets/img/myLocation.png')}
              style={styles.custom.imgIconSm}
            />
            <Text
              style={[
                styles.text.white,
                styles.text.center,
                styles.font.size8,
              ]}>
              My location
            </Text>
          </View>
        </TouchableOpacity>
        <View style={[styles.custom.header]}>
          <View style={[styles.bg.purple, {height: 120}]}>
            <View style={[styles.custom.headerBg, styles.shadow.md]}>
              <Text style={styles.custom.title}>TChat.ID</Text>
            </View>
          </View>
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
                  style={[styles.custom.imgIcon, styles.align.self]}
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
        <View style={{flex: 1}}>
          <MapView
            ref={map => (this._map = map)}
            provider={PROVIDER_GOOGLE}
            style={styles.custom.map}
            showsUserLocation
            initialRegion={this.state.initialPosition}>
            <Polygon coordinates={this.state.coordinates} strokeWidth={0} />
            {this.state.coordinates.map((marker, index) => {
              for (let y = 1; y <= this.state.friends.length; y++) {
                y--;
                if (
                  this.state.coordinates[index]['phone'] ===
                  this.state.friends[y]['phone']
                ) {
                  return (
                    <Marker
                      key={marker.phone}
                      ref={ref => (this.state.markers[index] = ref)}
                      onPress={() => this.onMakerPressed(marker, index)}
                      coordinate={{
                        latitude: marker.latitude,
                        longitude: marker.longitude,
                      }}>
                      <Thumbnail source={{uri: marker.image}}></Thumbnail>
                      <Callout>
                        <View>
                          <Text style={styles.text.center}>{marker.name}</Text>
                        </View>
                      </Callout>
                    </Marker>
                  );
                }
                y++;
              }
            })}
          </MapView>
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={this.state.friends}
            containerCustomStyle={styles.custom.carousel}
            renderItem={this.renderCarouseItem}
            sliderWidth={Dimensions.get('window').width}
            removeClippedSubviews={false}
            itemWidth={Dimensions.get('window').width - 70}
            // onSnapToItem={index => this.onCarouselItemChange(index)}
          />
        </View>
      </>
    );
  }
}
