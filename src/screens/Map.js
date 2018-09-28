import _ from 'lodash';
import React, { Component } from 'react';
import styled from 'styled-components';
import Images from '@assets';
import MapView, { Marker } from 'react-native-maps';
import { observer, inject } from 'mobx-react';

import BaseButton from '../components/BaseButton';
import BaseText from '../components/BaseText';
import withLoading from '../HOC/withLoading';
import { toilets, trashCans, conveniencStores } from '../datas/pins';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const Header = styled.View`
  flex: 1;
  padding-top: 38px;
  padding-horizontal: 24px;
`;

const Button = styled(BaseButton)``;

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

  constructor(props) {
    super(props);
    this.state = {
      convenienceCategory: 0,
      pins: trashCans,
    };
  }

  onLoadMap = () => {
    const { pins } = this.state;
    this.map.fitToCoordinates(pins, {
      edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
      animated: true,
    });
  };

  setMapRef = ref => {
    this.map = ref;
  };

  chagneCartegoty = convenienceCategory => {
    const { pins } = this.state;
    if (convenienceCategory === 0) {
      this.setState({ convenienceCategory, pins: trashCans });
      this.map.fitToCoordinates(trashCans, {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        animated: true,
      });
      return;
    }

    if (convenienceCategory === 1) {
      this.setState({ convenienceCategory, pins: conveniencStores });
      this.map.fitToCoordinates(conveniencStores, {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        animated: true,
      });
      return;
    }

    if (convenienceCategory === 2) {
      this.setState({ convenienceCategory, pins: toilets });
      this.map.fitToCoordinates(toilets, {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        animated: true,
      });
    }
  };

  render() {
    const { convenienceCategory, pins } = this.state;

    return (
      <Container>
        <Header>
          <HeaderTitle>편의시설을 확인해보세요</HeaderTitle>
          <CategoryView>
            <Button onPress={_.partial(this.chagneCartegoty, 0)}>
              <CategoryText selected={convenienceCategory === 0}>휴지통</CategoryText>
            </Button>

            <Button onPress={_.partial(this.chagneCartegoty, 1)}>
              <CategoryText selected={convenienceCategory === 1}>편의점</CategoryText>
            </Button>

            <Button onPress={_.partial(this.chagneCartegoty, 2)}>
              <CategoryText selected={convenienceCategory === 2}>화장실</CategoryText>
            </Button>
          </CategoryView>
        </Header>
        <Body>
          <InfoMapView innerRef={this.setMapRef} onLayout={this.onLoadMap}>
            {pins.map(pin => <Marker key={pin.longitude} coordinate={pin} />)}
          </InfoMapView>
        </Body>
      </Container>
    );
  }
}
