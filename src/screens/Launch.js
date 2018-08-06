import _ from 'lodash';
import React, { Component } from 'react';
import { AccessToken } from 'react-native-fbsdk';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';
import Lotties from '@lottie';

export default class Launch extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.startAnimation();

    setTimeout(() => {
      AccessToken.getCurrentAccessToken().then(data => {
        if (_.isEmpty(data)) {
          this.props.navigation.navigate('Login');
          return;
        }
        this.props.navigation.navigate('App');
      });
    }, 2100);
  }

  startAnimation = () => {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 2200,
      easing: Easing.linear,
    }).start();
  };

  render() {
    return (
      <View style={styles.container}>
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          source={Lotties.splash}
          progress={this.state.progress}
        />
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
