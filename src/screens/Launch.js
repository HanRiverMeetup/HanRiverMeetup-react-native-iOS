import _ from 'lodash';
import React, { Component } from 'react';
import { AccessToken } from 'react-native-fbsdk';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

export default class Launch extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  componentDidMount() {
    AccessToken.getCurrentAccessToken().then(data => {
      if (_.isEmpty(data)) {
        this.props.navigation.navigate('Login');
        return;
      }
      this.props.navigation.navigate('App');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>LaunchScreen</Text>
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
});
