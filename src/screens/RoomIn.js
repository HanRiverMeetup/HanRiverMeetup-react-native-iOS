import React, { Component } from 'react';
// import { Dimensions } from 'react-native';
import styled from 'styled-components';
// import Images from '@assets';
import LinearGradient from 'react-native-linear-gradient';
import KeyboardSpacer from 'react-native-keyboard-spacer';
// import PropTypes from 'prop-types';
// import ResponsiveImage from 'react-native-responsive-image';

// import NaviHeader from '../components/NaviHeader';
import BaseButton from '../components/BaseButton';

// const { width: deviceWidth } = Dimensions.get('window');

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #2186f8;
`;

const Header = styled(LinearGradient)`
  flex: 1.1;
`;

const Body = styled.View`
  flex: 3;
  background-color: white;
`;

const ChatTextInput = styled.TextInput`
  background-color: orange;
  height: 44;
  padding-left: 24;
  justify-content: center;
  flex: 3.5;
`;

const RegButton = styled(BaseButton)`
  flex: 1;
  height: 44;
  background-color: blue;
`;

const Bottom = styled.View`
  flex: 0.3;
  background-color: red;
  flex-direction: row;
`;

const RegText = styled.Text`
  color: white;
  font-family: NanumSquareR;
  font-size: 15.9;
`;

const KeyBoard = styled(KeyboardSpacer)``;

class RoomIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Header colors={['#2186f8', '#1fa6df']} />
        <Body />
        <Bottom>
          <ChatTextInput placeholder="궁금한 사항을 댓글로 물어보세요" />
          <RegButton>
            <RegText>등록</RegText>
          </RegButton>
        </Bottom>
        <KeyBoard topSpacing={20} />
      </Container>
    );
  }
}

export default RoomIn;
