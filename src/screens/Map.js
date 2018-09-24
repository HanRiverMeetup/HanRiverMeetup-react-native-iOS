import React, { Component } from 'react';
import styled from 'styled-components';
import Images from '@assets';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import BaseButton from '../components/BaseButton';
import BaseText from '../components/BaseText';
import withLoading from '../HOC/withLoading';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const Header = styled.View`
  flex: 1;
  padding-top: 38px;
  padding-horizontal: 24px;
`;

const CategoryView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  margin-bottom: 24px;
  padding-horizontal: 10px;
`;

const CategoryText = styled(BaseText)`
  color: ${({ selected }) => (selected ? '#2186f8' : '#b1b1b1')};
  font-weight: ${({ selected }) => (selected ? '800' : '400')};
`;

const HeaderTitle = styled(BaseText)`
  font-size: 22;
  color: #333333;
`;

const Body = styled.View`
  flex: 4;
`;

const InfoMapView = styled(MapView)`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

const TabIcon = styled.Image`
  width: 18px;
  height: 18px;
`;

@inject(stores => ({
  userStore: stores.store.userStore,
}))
@withLoading
@observer
export default class Map extends Component {
  static navigationOptions = () => ({
    title: '어디로강',
    tabBarIcon: ({ tintColor }) => <TabIcon source={Images.rectangle} style={{ tintColor }} />,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  render() {
    return (
      <Container>
        <Header>
          <HeaderTitle>편의시설을 확인해보세요</HeaderTitle>
          <CategoryView>
            <CategoryText selected>휴지통</CategoryText>
            <CategoryText>편의점</CategoryText>
            <CategoryText>화장실</CategoryText>
          </CategoryView>
        </Header>
        <Body>
          <InfoMapView />
        </Body>
      </Container>
    );
  }
}
