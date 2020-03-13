const React = require('react-native');

const {StyleSheet} = React;

const text = StyleSheet.create({
  purple: {color: '#5a52a5'},
  white: {color: '#fff'},
  gray: {color: 'gray'},
  black: {color: 'black'},
  center: {textAlign: 'center'},
});

const font = StyleSheet.create({
  size15: {fontSize: 15},
  size20: {fontSize: 20},
  size40: {fontSize: 40},
  size50: {fontSize: 50},
  weight: {fontWeight: 'bold'},
});

const margin = StyleSheet.create({
  vertical20: {marginVertical: 20},
  vertical50: {marginVertical: 50},
  top20: {marginTop: 20},
  bottom20: {marginBottom: 20},
  bottom50: {marginBottom: 50},
});

const flex = StyleSheet.create({
  directionRow: {flexDirection: 'row'},
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgPurple: {backgroundColor: '#5a52a5'},
  padding: {padding: 20},
  paddingHorizontal: {paddingHorizontal: 20},
  paddingVertical: {paddingVertical: 20},
  btn: {paddingHorizontal: 50, paddingVertical: 15, width: 'auto'},

  boxStyleRight: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 15,
  },
  boxStyleLeft: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 5,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  input: {
    borderWidth: 1,
    width: '90%',
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#eee',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export {text, font, margin, flex, styles};
