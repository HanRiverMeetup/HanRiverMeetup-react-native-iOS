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

const TabIcon = styled.Image`
  width: 20px;
  height: 20px;
`;

export default class Home extends Component {
  static navigationOptions = () => {
    return {
      title: '지금한강',
      tabBarIcon: ({ tintColor }) => {
        return <TabIcon source={Images.bubble} style={{ tintColor }} />;
      },
    };
  };

  render() {
    return (
      <Container>
        <ListText>지금한강</ListText>
      </Container>
    );
  }
}
