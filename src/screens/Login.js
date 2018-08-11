import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Dimensions } from 'react-native';
import { observer, inject } from 'mobx-react';

import Images from '@assets';
import BaseButton from '../components/BaseButton';
import BaseText from '../components/BaseText';

const { width: deviceWidth } = Dimensions.get('window');

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const Body = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
`;

const LogoIcon = styled.Image`
  width: 65px;
  height: 64px;
`;

const LogoTitle = styled.Image`
  width: 73px;
  height: 23px;
  margin-top: 14px;
`;

const FacebookLogo = styled.Image`
  width: 72px;
  height: 14px;
`;

const LoginText = styled(BaseText)`
  font-size: 14;
  margin-left: 3px;
  color: white;
  font-family: NanumSquareB;
`;

const ButtonView = styled.View`
  justify-content: center;
  align-content: center;
  flex-direction: row;
`;

const FacebookButton = styled(BaseButton).attrs({ underlayColor: 'rgba(49,49,49,0.3)' })`
  background-color: #3b5998;
  height: 50px;
  position: absolute;
  bottom: 0px;
  border-color: #dcdcdc;
  width: ${deviceWidth};
`;

@inject(stores => ({
  userStore: stores.store.userStore,
  isLoading: stores.store.userStore.isLoading,
}))
@observer
class Login extends Component {
  static propTypes = {
    userStore: PropTypes.shape({
      fbToken: PropTypes.string,
    }).isRequired,
  };

  fbAuth = () => {
    const { userStore } = this.props;
    userStore.logInWithFB();
  };

  render() {
    return (
      <Container>
        <Body>
          <LogoIcon source={Images.logo_icon} />
          <LogoTitle source={Images.app_title} />
        </Body>
        <FacebookButton onPress={this.fbAuth}>
          <ButtonView>
            <FacebookLogo source={Images.facebook_logo} />
            <LoginText>로 로그인</LoginText>
          </ButtonView>
        </FacebookButton>
      </Container>
    );
  }
}

export default Login;
