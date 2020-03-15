// Library
import React, {Component} from 'react';
import {
  Text,
  KeyboardAvoidingView,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
  Platform,
  Keyboard,
  AvoidingView,
} from 'react-native';
import firebase from 'firebase';

import User from '../../../User';

// Styles
import styles from '../Styles';

const isIOS = Platform.OS === 'ios';

export default class Chat extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('name', null),
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#5a52a5',
      },
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      person: {
        name: props.navigation.getParam('name'),
        phone: props.navigation.getParam('phone'),
      },
      textMessage: '',
      messageList: [],
      dbRef: firebase.database(),
    };
    this.keyboardHeight = new Animated.Value(0);
    this.bottomPadding = new Animated.Value(80);
  }

  componentDidMount() {
    this.keyboardShowListener = Keyboard.addListener(
      isIOS ? 'keyboardWillShow' : 'keyboardDidShow',
      e => this.keyboardEvent(e, true),
    );
    this.keyboardHideListener = Keyboard.addListener(
      isIOS ? 'keyboardWillHide' : 'keyboardDidHide',
      e => this.keyboardEvent(e, false),
    );
    this.state.dbRef
      .ref('messages')
      .child(User.phone)
      .child(this.state.person.phone)
      .on('child_added', value => {
        this.setState(prevState => {
          return {
            messageList: [...prevState.messageList, value.val()],
          };
        });
      });
  }

  componentWillUnmount() {
    this.state.dbRef.ref('messages').off();
    this.keyboardShowListener.remove();
    this.keyboardHideListener.remove();
  }

  // UNSAFE_componentWillMount() {}

  keyboardEvent = (event, isShow) => {
    let heightOS = isIOS ? 140 : 80; //kolom text pass naik keyboard
    let bottomOS = isIOS ? 140 : 155; //jarak flat list kebawah ketika keyboard open
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: isShow ? heightOS : 0, //kolom text pass turun keyboard
      }),
      Animated.timing(this.bottomPadding, {
        duration: event.duration,
        toValue: isShow ? bottomOS : 75,
      }),
    ]).start();
  };

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  convertTime = time => {
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
    result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    if (c.getDay() !== d.getDay()) {
      result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
    }
    return result;
  };

  sendMessage = async () => {
    if (this.state.textMessage.length > 0) {
      let msgId = this.state.dbRef
        .ref('messages')
        .child(User.phone)
        .child(this.state.person.phone)
        .push().key;
      let updates = {};
      let message = {
        message: this.state.textMessage,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: User.phone,
      };
      updates[
        User.phone + '/' + this.state.person.phone + '/' + msgId
      ] = message;
      updates[
        this.state.person.phone + '/' + User.phone + '/' + msgId
      ] = message;
      this.state.dbRef.ref('messages/').update(updates);
      this.setState({textMessage: ''});
    }
  };

  renderRow = ({item}) => {
    return (
      // item.from === User.phone? :
      <>
        <View
          style={[
            styles.custom.boxChat,
            styles.padding.horizontal[20],
            styles.padding.vertical[10],
            styles.shadow.sm,
            styles.margin.vertical[5],
            styles.margin.horizontal[20],
            item.from === User.phone
              ? styles.custom.boxStyleLeft
              : styles.custom.boxStyleRight,
            item.from === User.phone ? styles.bg.white : styles.bg.purple,
            item.from === User.phone
              ? styles.custom.boxRight
              : styles.custom.boxLeft,
          ]}>
          <Text
            style={[
              item.from === User.phone ? styles.text.black : styles.text.white,
              item.from === User.phone
                ? styles.custom.textRight
                : styles.custom.textLeft,
            ]}>
            {item.message}
            {'\n'}
            {this.convertTime(item.time)}
          </Text>
        </View>
      </>
    );
  };

  render() {
    let {height} = Dimensions.get('window');
    return (
      <>
        <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
          <Animated.View
            style={[
              styles.custom.contentBottom,
              {bottom: this.keyboardHeight},
            ]}>
            <View
              style={[
                styles.flex.directionRow,
                styles.flex.justify,
                styles.padding.top[10],
                styles.padding.horizontal[20],
              ]}>
              <TextInput
                placeholder="Type message ..."
                value={this.state.textMessage}
                style={[
                  styles.custom.input,
                  styles.width.percent[75],
                  styles.custom.boxStyleRight,
                  styles.shadow.sm,
                ]}
                onChangeText={this.handleChange('textMessage')}
              />
              <View style={[styles.width.percent[20]]}>
                <TouchableOpacity
                  onPress={() => this.sendMessage()}
                  style={[
                    styles.bg.purple,
                    styles.shadow.md,
                    styles.custom.boxStyleLeft,
                    styles.custom.btnSend,
                  ]}>
                  <View>
                    <Text style={[styles.text.white, styles.text.textCenter]}>
                      S
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
          <FlatList
            style={[{height: height}]}
            onContentSizeChange={() =>
              this.flatList.scrollToEnd({animated: true})
            }
            onLayout={() => this.flatList.scrollToEnd({animated: true})}
            ref={ref => (this.flatList = ref)}
            data={this.state.messageList}
            renderItem={this.renderRow}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={
              <Animated.View style={{height: this.bottomPadding}} />
            }
          />
        </KeyboardAvoidingView>
      </>
    );
  }
}
