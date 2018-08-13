import React, { Component } from 'react';
import styled from 'styled-components';
import Images from '@assets';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const ListText = styled.Text`
  font-family: NanumSquareR;
  font-size: 18;
`;

export default class Home extends Component {
  render() {
    return (
      <Container>
        <ListText>회원가입 화면</ListText>
      </Container>
    );
  }
}
