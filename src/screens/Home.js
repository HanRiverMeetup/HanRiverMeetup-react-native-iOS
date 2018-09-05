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

const CONTENTS_LIST = [
  {
    id: 0,
    image: Images.chicken_icon,
    title: '치킨 같이 먹을사람~',
    iconSize: { width: 44, height: 44 },
  },
  {
    id: 1,
    image: Images.bycycle_icon,
    title: '자전거 같이 탈래?',
    iconSize: { width: 43, height: 45 },
  },
  { id: 2, image: Images.duck_icon, title: '오리배 타자!', iconSize: { width: 48, height: 35 } },
  {
    id: 3,
    image: Images.camp_icon,
    title: '캠핑 함께 즐겨요~',
    iconSize: { width: 43, height: 41 },
  },
  {
    id: 4,
    image: Images.camera_icon,
    title: '사진 같이 찍을래?',
    iconSize: { width: 40, height: 42 },
  },
  {
    id: 5,
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
  isLoading: stores.store.userStore.isLoading,
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
  };

  goDetail = index => {
    const { navigation } = this.props;
    navigation.navigate('HomeDetail', { index });
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
