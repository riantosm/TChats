const React = require('react-native');

const {StyleSheet} = React;

const style = {
  custom: StyleSheet.create({
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
  }),

  container: StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),

  bg: StyleSheet.create({
    purple: {backgroundColor: '#5a52a5'},
    white: {backgroundColor: '#fff'},
    gray: {backgroundColor: 'gray'},
    black: {backgroundColor: 'black'},
  }),

  text: StyleSheet.create({
    purple: {color: '#5a52a5'},
    white: {color: '#fff'},
    gray: {color: 'gray'},
    black: {color: 'black'},
    center: {textAlign: 'center'},
  }),

  font: StyleSheet.create({
    size15: {fontSize: 15},
    size20: {fontSize: 20},
    size40: {fontSize: 40},
    size50: {fontSize: 50},
    weight: {fontWeight: 'bold'},
  }),

  flex: StyleSheet.create({
    directionRow: {flexDirection: 'row'},
  }),

  shadow: StyleSheet.create({
    sm: {
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 2,
    },
  }),

  border: {
    border: StyleSheet.create({
      1: {borderWidth: 1},
    }),
    top: StyleSheet.create({
      1: {borderTopWidth: 1},
    }),
    bottom: StyleSheet.create({
      1: {borderBottomWidth: 1},
    }),
    left: StyleSheet.create({
      1: {borderLeftWidth: 1},
    }),
    right: StyleSheet.create({
      1: {borderRightWidth: 1},
    }),
    color: StyleSheet.create({
      gray: {borderColor: 'gray'},
    }),
  },

  padding: {
    padding: StyleSheet.create({
      10: {padding: 10},
      20: {padding: 20},
      30: {padding: 30},
      40: {padding: 40},
      50: {padding: 50},
      60: {padding: 60},
      70: {padding: 70},
      80: {padding: 80},
      90: {padding: 90},
      100: {padding: 100},
    }),
    vertical: StyleSheet.create({
      10: {paddingVertical: 10},
      20: {paddingVertical: 20},
      30: {paddingVertical: 30},
      40: {paddingVertical: 40},
      50: {paddingVertical: 50},
      60: {paddingVertical: 60},
      70: {paddingVertical: 70},
      80: {paddingVertical: 80},
      90: {paddingVertical: 90},
      100: {paddingVertical: 100},
    }),
    horizontal: StyleSheet.create({
      10: {paddingHorizontal: 10},
      20: {paddingHorizontal: 20},
      30: {paddingHorizontal: 30},
      40: {paddingHorizontal: 40},
      50: {paddingHorizontal: 50},
      60: {paddingHorizontal: 60},
      70: {paddingHorizontal: 70},
      80: {paddingHorizontal: 80},
      90: {paddingHorizontal: 90},
      100: {paddingHorizontal: 100},
    }),
    top: StyleSheet.create({
      10: {paddingTop: 10},
      20: {paddingTop: 20},
      30: {paddingTop: 30},
      40: {paddingTop: 40},
      50: {paddingTop: 50},
      60: {paddingTop: 60},
      70: {paddingTop: 70},
      80: {paddingTop: 80},
      90: {paddingTop: 90},
      100: {paddingTop: 100},
    }),
    bottom: StyleSheet.create({
      10: {paddingBottom: 10},
      20: {paddingBottom: 20},
      30: {paddingBottom: 30},
      40: {paddingBottom: 40},
      50: {paddingBottom: 50},
      60: {paddingBottom: 60},
      70: {paddingBottom: 70},
      80: {paddingBottom: 80},
      90: {paddingBottom: 90},
      100: {paddingBottom: 100},
    }),
    left: StyleSheet.create({
      10: {paddingLeft: 10},
      20: {paddingLeft: 20},
      30: {paddingLeft: 30},
      40: {paddingLeft: 40},
      50: {paddingLeft: 50},
      60: {paddingLeft: 60},
      70: {paddingLeft: 70},
      80: {paddingLeft: 80},
      90: {paddingLeft: 90},
      100: {paddingLeft: 100},
    }),
    right: StyleSheet.create({
      10: {paddingRight: 10},
      20: {paddingRight: 20},
      30: {paddingRight: 30},
      40: {paddingRight: 40},
      50: {paddingRight: 50},
      60: {paddingRight: 60},
      70: {paddingRight: 70},
      80: {paddingRight: 80},
      90: {paddingRight: 90},
      100: {paddingRight: 100},
    }),
  },

  margin: {
    margin: StyleSheet.create({
      10: {margin: 10},
      20: {margin: 20},
      30: {margin: 30},
      40: {margin: 40},
      50: {margin: 50},
      60: {margin: 60},
      70: {margin: 70},
      80: {margin: 80},
      90: {margin: 90},
      100: {margin: 100},
    }),
    vertical: StyleSheet.create({
      10: {marginVertical: 10},
      20: {marginVertical: 20},
      30: {marginVertical: 30},
      40: {marginVertical: 40},
      50: {marginVertical: 50},
      60: {marginVertical: 60},
      70: {marginVertical: 70},
      80: {marginVertical: 80},
      90: {marginVertical: 90},
      100: {marginVertical: 100},
    }),
    horizontal: StyleSheet.create({
      10: {marginHorizontal: 10},
      20: {marginHorizontal: 20},
      30: {marginHorizontal: 30},
      40: {marginHorizontal: 40},
      50: {marginHorizontal: 50},
      60: {marginHorizontal: 60},
      70: {marginHorizontal: 70},
      80: {marginHorizontal: 80},
      90: {marginHorizontal: 90},
      100: {marginHorizontal: 100},
    }),
    top: StyleSheet.create({
      10: {marginTop: 10},
      20: {marginTop: 20},
      30: {marginTop: 30},
      40: {marginTop: 40},
      50: {marginTop: 50},
      60: {marginTop: 60},
      70: {marginTop: 70},
      80: {marginTop: 80},
      90: {marginTop: 90},
      100: {marginTop: 100},
    }),
    bottom: StyleSheet.create({
      10: {marginBottom: 10},
      20: {marginBottom: 20},
      30: {marginBottom: 30},
      40: {marginBottom: 40},
      50: {marginBottom: 50},
      60: {marginBottom: 60},
      70: {marginBottom: 70},
      80: {marginBottom: 80},
      90: {marginBottom: 90},
      100: {marginBottom: 100},
    }),
    left: StyleSheet.create({
      10: {marginLeft: 10},
      20: {marginLeft: 20},
      30: {marginLeft: 30},
      40: {marginLeft: 40},
      50: {marginLeft: 50},
      60: {marginLeft: 60},
      70: {marginLeft: 70},
      80: {marginLeft: 80},
      90: {marginLeft: 90},
      100: {marginLeft: 100},
    }),
    right: StyleSheet.create({
      10: {marginRight: 10},
      20: {marginRight: 20},
      30: {marginRight: 30},
      40: {marginRight: 40},
      50: {marginRight: 50},
      60: {marginRight: 60},
      70: {marginRight: 70},
      80: {marginRight: 80},
      90: {marginRight: 90},
      100: {marginRight: 100},
    }),
  },
  // padding: {
  //   padding: StyleSheet.create({
  //     10: {padding: 10},
  //     20: {padding: 20},
  //   }),
  //   horizontal: StyleSheet.create({
  //     10: {paddingHorizontal: 10},
  //     20: {paddingHorizontal: 20},
  //   }),
  // },
  // bg: StyleSheet.create({
  //   purple: {backgroundColor: '#5a52a5'},
  // }),
};

export default style;

// export const styles = StyleSheet.create({
//   bgPurple: {backgroundColor: '#5a52a5'},
//   padding: {padding: 20},
//   paddingHorizontal: {paddingHorizontal: 20},
//   paddingVertical: {paddingVertical: 20},
// });