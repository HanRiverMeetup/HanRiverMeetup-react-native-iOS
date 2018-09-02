import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import BaseText from '../components/BaseText';
import BaseButton from '../components/BaseButton';
import withLoading from '../HOC/withLoading';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const KeyboardAwareView = styled(KeyboardAwareScrollView).attrs({
  contentContainerStyle: {
    height: deviceHeight,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
})``;

const WelcomeText = styled(BaseText)`
  font-size: 22px;
  color: #333333;
  line-height: 38px;
`;

const UserRegButton = styled(BaseButton)`
  background-color: #2186f8;
  height: 50px;
  position: absolute;
  bottom: 0px;
  width: ${deviceWidth}px;
`;

const UserRegText = styled(BaseText)`
  font-size: 14px;
  font-family: NanumSquareB;
`;

const BlueText = styled(BaseText)`
  font-size: 22px;
  font-family: NanumSquareB;
  color: #2186f8;
  line-height: 38px;
`;

const NickNameInput = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: #dcdcdc;
  height: 26px;
  width: ${deviceWidth - 46}px;
  margin-top: 85px;
  font-family: NanumSquareR;
  font-size: 14px;
  color: #333333;
  padding-bottom: 12px;
`;

const MainView = styled.View`
  padding-horizontal: 24px;
  justify-content: space-between;
  margin-bottom: 100px;
`;

@inject(stores => ({
  userStore: stores.store.userStore,
  isLoading: stores.store.userStore.isLoading,
}))
@withLoading
@observer
export default class SignIn extends Component {
  state = {
    nickName: '',
  };

  onChangeText = text => {
    this.setState({ nickName: text });
  };

  registerNickName = async () => {
    const { navigation, userStore } = this.props;
    const { nickName } = this.state;

    try {
      await userStore.registUser(nickName);
      navigation.navigate('MainTabbar');
    } catch (error) {
      alert(error);
    }
  };

  render() {
    const { nickName } = this.state;
    return (
      <KeyboardAwareView extraHeight={70} scrollEnabled={false}>
        <MainView>
          <WelcomeText>
            {'반갑습니다!\n'}
            <BlueText>심심한강</BlueText>
            {'에서 사용 할\n닉네임을 입력해 주세요:)'}
          </WelcomeText>
          <NickNameInput
            placeholder="특수문자 제외, 6자 이내의 닉네임을 정해주세요."
            placeholderTextColor="#949494"
            maxLength={6}
            onChangeText={this.onChangeText}
            value={nickName}
          />
        </MainView>
        <UserRegButton onPress={this.registerNickName}>
          <UserRegText>등록하기</UserRegText>
        </UserRegButton>
      </KeyboardAwareView>
    );
  }
}
