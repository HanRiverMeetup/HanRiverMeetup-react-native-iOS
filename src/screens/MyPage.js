import React, { Component } from 'react';
import styled from 'styled-components';
import Images from '@assets';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import { observer, inject } from 'mobx-react';

import BaseButton from '../components/BaseButton';
import withLoading from '../HOC/withLoading';

const { width: deviceWidth } = Dimensions.get('window');

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const Header = styled.View`
  flex: 1;
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

@inject(stores => ({
  userStore: stores.store.userStore,
  roomStore: stores.store.roomStore,
  isLoading: stores.store.roomStore.isLoading,
}))
@withLoading
@observer
export default class MyPage extends Component {
  static navigationOptions = () => ({
    title: '난누굴강',
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
          <HeaderTitle>{`안녕하세요\n${nickName}님 반가워요`}</HeaderTitle>
        </Header>
        <Body />
      </Container>
    );
  }
}
