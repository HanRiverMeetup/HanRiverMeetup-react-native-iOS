import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Images from '@assets';

import BaseText from '../components/BaseText';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const TabIcon = styled.Image`
  width: 20px;
  height: 20px;
`;

const ListText = styled.Text`
  font-family: NanumSquareR;
  font-size: 18;
`;

export default class Home extends Component {
  static navigationOptions = () => ({
    title: '난누굴강',
    tabBarIcon: ({ tintColor }) => <TabIcon source={Images.info_tab} style={{ tintColor }} />,
  });

  render() {
    return (
      <Container>
        <ListText>난누굴강</ListText>
      </Container>
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
