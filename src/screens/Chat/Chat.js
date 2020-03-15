// Library
import React, {Component} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import firebase from 'firebase';

import User from '../../../User';

// Styles
import styles from '../Styles';

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
      dbRef: firebase.database(),
      messageList: [],
    };
  }

  componentDidMount() {}

  UNSAFE_componentWillMount() {
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
        'messages/' + User.phone + '/' + this.state.person.phone + '/' + msgId
      ] = message;
      updates[
        'messages/' + this.state.person.phone + '/' + User.phone + '/' + msgId
      ] = message;
      this.state.dbRef.ref().update(updates);
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
        <SafeAreaView>
          <FlatList
            style={[styles.margin.vertical[20], {height: height * 0.75}]}
            ref={ref => (this.flatList = ref)}
            data={this.state.messageList}
            renderItem={this.renderRow}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={styles.custom.contentBottom}>
            <View
              style={[
                styles.container.top,
                styles.flex.directionRow,
                styles.flex.justify,
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
          </View>
        </SafeAreaView>
      </>
    );
  }
}
