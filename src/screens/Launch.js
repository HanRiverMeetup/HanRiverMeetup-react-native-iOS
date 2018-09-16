import _ from 'lodash';
import React, { Component } from 'react';
import { AccessToken } from 'react-native-fbsdk';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';
import Lotties from '@lottie';

@inject(stores => ({
  userStore: stores.store.userStore,
  isLoading: stores.store.userStore.isLoading,
}))
@observer
class Launch extends Component {
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

  async componentDidMount() {
    const { navigation, userStore } = this.props;

    const data = await Promise.all([this.animateAsync(), AccessToken.getCurrentAccessToken()]);

    if (_.isEmpty(data[1])) {
      navigation.navigate('Login');
      return;
    }

    const loginInfo = {
      access_token: data[1].accessToken,
      user_id: data[1].userID,
    };

    try {
      const userNickName = await userStore.loginValidate(loginInfo);
      if (_.isEmpty(userNickName)) {
        navigation.navigate('SignIn');
        return;
      }
      navigation.navigate('App');
    } catch (error) {
      alert('서버에서 데이터를 읽어오지 못했습니다!');
    }
  }

  startAnimation = () => {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 2200,
      easing: Easing.linear,
    }).start();
  };

  animateAsync = () =>
    new Promise(resolve => {
      this.startAnimation();
      setTimeout(() => {
        resolve();
      }, 2100);
    });

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

export default Launch;
