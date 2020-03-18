// Library
import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';

import User from '../../../User';

// Styles
import styles from '../Styles';

export default class Profile extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor() {
    super();
    this.state = {
      name: User.name,
      imageSource: User.image
        ? {uri: User.image}
        : require('../../../assets/img/new_user.png'),
      upload: false,
    };
  }

  componentDidMount() {}

  logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  changeName = async () => {
    if (this.state.name.length < 3) {
      Alert.alert('kurang');
    } else {
      if (User.name !== this.state.name) {
        User.name = this.state.name;
        this.updateUser();
      }
    }
  };

  updateUser = () => {
    firebase
      .database()
      .ref('users')
      .child(User.phone)
      .update(User);
    Alert.alert('Saved');
  };

  changeImage = () => {
    const options = {
      quality: 0.7,
      allowsEditing: true,
      mediaType: 'photo',
      noData: true,
      storageOptions: {
        skipBackup: true,
        waitUntilSaved: true,
        path: 'images',
        cameraRoll: true,
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState(
          {
            upload: true,
            imageSource: {uri: response.uri},
          },
          this.uploadFile,
        );
      }
    });
  };

  updateUserImage = imageUrl => {
    User.image = imageUrl;
    this.updateUser();
    this.setState({upload: false, imageSource: {uri: imageUrl}});
  };

  uploadFile = async () => {
    const file = await this.uriToBlob(this.state.imageSource.uri);
    firebase
      .storage()
      .ref(`profile_pictures/${User.phone}.png`)
      .put(file)
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => this.updateUserImage(url))
      .catch(error => {
        this.setState({
          imageSource: require('../../../assets/img/new_user.png'),
          upload: false,
        });
        Alert.alert('error upload');
      });
  };

  uriToBlob = uri => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };

      xhr.onerror = function() {
        reject(new Error('Error on upload image'));
      };

      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
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
          <View style={[styles.container.top, styles.padding.vertical[70]]}>
            <TouchableOpacity onPress={() => this.changeImage()}>
              {this.state.upload ? (
                <ActivityIndicator size="large" />
              ) : (
                <Image
                  style={[
                    styles.width.normal[100],
                    styles.height.normal[100],
                    styles.custom.boxStyleRight,
                  ]}
                  source={this.state.imageSource}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.margin.top[20]}>{User.phone}</Text>
            <TextInput
              value={this.state.name}
              onChangeText={this.handleChange('name')}
              style={[
                styles.custom.input,
                styles.width.percent[90],
                styles.custom.boxStyleRight,
                styles.shadow.sm,
                styles.margin.top[10],
              ]}
            />
            <TouchableOpacity
              onPress={() => this.changeName()}
              style={[
                styles.bg.purple,
                styles.shadow.sm,
                styles.custom.boxStyleRight,
                styles.custom.btn,
                styles.margin.top[20],
              ]}>
              <View>
                <Text style={[styles.text.white, styles.text.textCenter]}>
                  Change Name
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.logout()}
              style={[
                styles.bg.purple,
                styles.shadow.sm,
                styles.custom.boxStyleRight,
                styles.custom.btn,
                styles.margin.vertical[50],
              ]}>
              <View>
                <Text style={[styles.text.white, styles.text.textCenter]}>
                  Sign out
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
    );
  }
}
