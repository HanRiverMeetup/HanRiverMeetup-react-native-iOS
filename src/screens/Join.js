import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class Home extends Component {
  static navigationOptions = options => {
    return {
      title: '같이놀강',
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>동해물과 백두산이 마르고 닳도록!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'NanumSquareR',
    fontSize: 22,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 32,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#333333',
  },
});
