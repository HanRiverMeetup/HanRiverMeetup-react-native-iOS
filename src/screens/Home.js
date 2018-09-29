import _ from 'lodash';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import { observer, inject } from 'mobx-react';
import Images from '@assets';

import { weathers } from '../datas/weathers';
import BaseButton from '../components/BaseButton';
import withLoading from '../HOC/withLoading';
import BaseText from '../components/BaseText';

const { width: deviceWidth } = Dimensions.get('window');

global.weather = _.head(_.shuffle(weathers));

const CONTENTS_LIST = [
  {
    id: 1,
    image: Images.chicken_icon,
    title: '치킨 같이 먹을사람~',
    iconSize: { width: 44, height: 44 },
  },
  {
    id: 2,
    image: Images.bycycle_icon,
    title: '자전거 같이 탈래?',
    iconSize: { width: 43, height: 45 },
  },
  { id: 3, image: Images.duck_icon, title: '오리배 타자!', iconSize: { width: 48, height: 35 } },
  {
    id: 4,
    image: Images.camp_icon,
    title: '캠핑 함께 즐겨요~',
    iconSize: { width: 43, height: 41 },
  },
  {
    id: 5,
    image: Images.camera_icon,
    title: '사진 같이 찍을래?',
    iconSize: { width: 40, height: 42 },
  },
  {
    id: 6,
    image: Images.etc_icon,
    title: '그 밖에 한강 모임들',
    iconSize: { width: 40, height: 43 },
  },
];

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const Header = styled.View`
  flex: 1.4;
  padding-top: 38px;
  padding-left: 24px;
`;

const Body = styled.View`
  flex: 4;
`;

const HeaderTitle = styled.Text`
  font-family: NanumSquareR;
  font-size: 22;
`;

const ContentsList = styled.FlatList`
  flex: 1;
  border-top-color: #dcdcdc;
  border-top-width: 1;
`;

const ListButton = styled(BaseButton)`
  flex: 1;
`;

const ContentView = styled.View`
  flex: 1;
  padding: 17px 40px 17px 40px;
  flex-direction: row;
  width: ${deviceWidth}px;
  align-items: center;
`;

const ListImage = styled(FastImage)`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

const ListText = styled.Text`
  font-family: NanumSquareR;
  font-size: 18;
  margin-left: 48px;
`;

const Seperator = styled.View`
  height: 1;
  background-color: #dcdcdc;
`;

const TabIcon = styled.Image`
  width: 18px;
  height: 18px;
`;

const WeatherView = styled.View`
  flex-direction: row;
  align-items: center;
  width: 180px;
  justify-content: space-around;
  margin-top: 21px;
`;

const WeatherImage = styled(FastImage)`
  width: 35px;
  height: 35px;
  margin-bottom: 4px;
`;

const TempText = styled(BaseText)`
  color: #2186f8;
  font-size: 40px;
`;

const MiniTempText = styled(BaseText)`
  color: #2186f8;
  font-size: 14px;
  bottom: 10px;
`;

const DetailWeatherView = styled.View``;

const DetailWeatherText = styled(BaseText)`
  color: #666666;
  font-size: 12px;
  line-height: 18px;
`;

@inject(stores => ({
  userStore: stores.store.userStore,
  roomStore: stores.store.roomStore,
  isLoading: stores.store.roomStore.isLoading,
}))
@withLoading
@observer
export default class Home extends Component {
  static navigationOptions = () => ({
    title: '같이놀강',
    tabBarIcon: ({ tintColor }) => <TabIcon source={Images.rectangle} style={{ tintColor }} />,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
    userStore: PropTypes.shape({}).isRequired,
    roomStore: PropTypes.shape({ fetchRoomsBySeqence: PropTypes.func.isRequired }).isRequired,
  };

  goDetail = async index => {
    const { navigation, roomStore } = this.props;

    try {
      await roomStore.fetchRoomsBySeqence(index);
      navigation.navigate('HomeDetail', { index });
    } catch (error) {
      setTimeout(() => {
        alert(`error' + ${error.message}`);
      }, 300);
    }
  };

  renderItem = ({ item }) => (
    <ListButton onPress={() => this.goDetail(item.id)}>
      <ContentView>
        <ListImage width={item.iconSize.width} height={item.iconSize.height} source={item.image} />
        <ListText>{item.title}</ListText>
      </ContentView>
    </ListButton>
  );

  render() {
    const { userStore } = this.props;
    const { nickName } = userStore;

    return (
      <Container>
        <Header>
          <HeaderTitle>{`${nickName}님,\n한강에서 즐겨볼까요?`}</HeaderTitle>
          <WeatherView>
            <WeatherImage source={global.weather.image} resizeMode="contain" />
            <TempText>{global.weather.temp}</TempText>
            <MiniTempText>℃</MiniTempText>
            <DetailWeatherView>
              <DetailWeatherText>{global.weather.text}</DetailWeatherText>
              <DetailWeatherText>{`${global.weather.min}℃ / ${
                global.weather.max
              }℃`}</DetailWeatherText>
            </DetailWeatherView>
          </WeatherView>
        </Header>
        <Body>
          <ContentsList
            data={CONTENTS_LIST}
            renderItem={this.renderItem}
            ItemSeparatorComponent={() => <Seperator />}
            keyExtractor={item => item.id.toString()}
          />
        </Body>
      </Container>
    );
  }
}
