// Library
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
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

import User from '../../../User';

// Styles
import styles from '../Styles';

export default class Map extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    markers: [],
    modalVisible: false,
    coordinates: [
      {
        id: '1',
        name: 'Bambang asdasdasdasdasdasdasdasdas',
        latitude: -6.388713,
        longitude: 106.84163,
        image: require('../../../assets/img/img1.png'),
      },
      {
        id: '2',
        name: 'Windi Putri',
        latitude: -6.393344,
        longitude: 106.83217,
        image: require('../../../assets/img/img2.png'),
      },
      {
        id: '3',
        name: 'Yuliyantiy',
        latitude: -6.406897,
        longitude: 106.815217,
        image: require('../../../assets/img/img3.png'),
      },
      {
        id: '4',
        name: 'Muhammad Mamad',
        latitude: -6.390086,
        longitude: 106.824234,
        image: require('../../../assets/img/img4.png'),
      },
      {
        id: '5',
        name: 'Kevin',
        latitude: -6.383976,
        longitude: 106.821681,
        image: require('../../../assets/img/img5.png'),
      },
    ],
  };

  myMarker() {
    Geolocation.getCurrentPosition(position => {
      this._map.animateToRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0,
        longitudeDelta: 0.01,
      });
    });
  }

  onCarouselItemChange = index => {
    let location = this.state.coordinates[index];

    this._map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0,
      longitudeDelta: 0.03,
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

  componentDidMount() {
    this.requestLocationPermission();
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

  renderCarouseItem = ({item, index}) => (
    <TouchableWithoutFeedback
      onPress={() => {
        this.onMakerPressed(item, index);
      }}>
      <View style={styles.custom.cardContainer}>
        <Text style={styles.custom.cardContainerTitle}>
          <Text style={styles.custom.cardTitle}>{item.name}</Text>
        </Text>
        <Image style={styles.custom.cardImage} source={item.image} />
      </View>
    </TouchableWithoutFeedback>
  );

  render() {
    return (
      <>
        <TouchableOpacity
          style={[styles.custom.network, styles.bg.purple, styles.shadow.sm]}
          onPress={() => this.myMarker()}>
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
        <View style={{flex: 1}}>
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
          <MapView
            ref={map => (this._map = map)}
            provider={PROVIDER_GOOGLE}
            style={styles.custom.map}
            showsUserLocation
            initialRegion={this.state.initialPosition}>
            <Polygon coordinates={this.state.coordinates} strokeWidth={0} />
            {this.state.coordinates.map((marker, index) => (
              <Marker
                key={marker.id}
                ref={ref => (this.state.markers[index] = ref)}
                onPress={() => this.onMakerPressed(marker, index)}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}>
                <Thumbnail source={marker.image}></Thumbnail>
                <Callout>
                  <View>
                    <Text style={styles.text.center}>{marker.name}</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={this.state.coordinates}
            containerCustomStyle={styles.custom.carousel}
            renderItem={this.renderCarouseItem}
            sliderWidth={Dimensions.get('window').width}
            removeClippedSubviews={false}
            itemWidth={100}
            onSnapToItem={index => this.onCarouselItemChange(index)}
          />
        </View>
      </>
    );
  }
}
