import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import Images from '@assets';
import FastImage from 'react-native-fast-image';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

import BaseText from '../components/BaseText';
import withLoading from '../HOC/withLoading';

const { width: deviceWidth } = Dimensions.get('window');

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const Header = styled.View`
  flex: 1;
  padding-vertical: 51px;
  padding-left: 24px;
`;

const HeaderTitle = styled(BaseText)`
  font-size: 22;
  color: #333333;
`;

const TabIcon = styled.Image`
  width: 20px;
  height: 20px;
`;

const IndicatorView = styled.View`
  width: 50px;
  height: 20px;
  border-radius: 10px;
  background-color: #000000;
  opacity: 0.7;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 24px;
  bottom: 8px;
`;

const IndicatorText = styled(BaseText)`
  font-size: 10px;
`;

const ContentsList = styled.FlatList``;

const Profile = styled(FastImage)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border-color: white;
  border-width: 1px;
`;

const NickNameText = styled(BaseText)`
  font-family: NanumSquareB;
  color: white;
  margin-left: 13.3px;
`;

const LocationText = styled(BaseText)`
  font-family: NanumSquareB;
  color: white;
  font-size: 12px;
  margin-left: 12px;
`;

const EventPager = styled.FlatList.attrs({ horizontal: true, pagingEnabled: true })`
  height: 152px;
`;

const PagerView = styled.View`
  height: 152px;
`;

const EvnetImage = styled(FastImage)`
  flex: 1;
  width: ${deviceWidth}px;
  height: 152px;
`;

const ContentsContainer = styled.View``;

const ContentPicture = styled(FastImage)`
  height: 228px;
  width: ${deviceWidth}px;
`;

const WritingView = styled.View`
  padding-horizontal: 24px;
  padding-top: 21px;
  padding-bottom: 20px;
`;

const Writing = styled(BaseText)`
  color: #666666;
  font-size: 12px;
`;

const UserInfoView = styled.View`
  flex-direction: row;
  align-items: center;
  position: absolute;
  bottom: 8.3px;
  left: 23.7px;
`;

@inject(stores => ({
  userStore: stores.store.userStore,
}))
@withLoading
@observer
export default class Home extends Component {
  static navigationOptions = () => ({
    title: '지금한강',
    tabBarIcon: ({ tintColor }) => <TabIcon source={Images.bubble} style={{ tintColor }} />,
  });

  static propTypes = {
    userStore: PropTypes.shape({}).isRequired,
  };

  evnetkeyExtractor = (item, index) => `${index}`;

  contentKeyExtractor = (item, index) => `${index}`;

  renderListHeader = () => {
    const { userStore } = this.props;
    return (
      <Header>
        <HeaderTitle>{`${userStore.nickName},\n한강소식을 알아볼까요? `}</HeaderTitle>
      </Header>
    );
  };

  renderEvents = ({ index }) => (
    <EvnetImage source={{ uri: `https://placeimg.com/400/200/${index}` }} />
  );

  renderContents = () => (
    <ContentsContainer>
      <ContentPicture source={{ uri: `https://via.placeholder.com/500x150` }}>
        <UserInfoView>
          <Profile source={{ uri: `https://placeimg.com/40/40/40` }} />
          <NickNameText>하이루</NickNameText>
          <LocationText>뚝섬 유원지</LocationText>
        </UserInfoView>
      </ContentPicture>
      <WritingView>
        <Writing>오늘 한강 괜춘?</Writing>
      </WritingView>
    </ContentsContainer>
  );

  render() {
    const dummis = [...new Array(3)];

    const conentsDummis = [...new Array(10)];

    return (
      <Container>
        <PagerView>
          <EventPager
            data={dummis}
            renderItem={this.renderEvents}
            keyExtractor={this.evnetkeyExtractor}
          />
          <IndicatorView>
            <IndicatorText>1 / 4</IndicatorText>
          </IndicatorView>
        </PagerView>

        <ContentsList
          data={conentsDummis}
          keyExtractor={this.contentKeyExtractor}
          renderItem={this.renderContents}
          ListHeaderComponent={this.renderListHeader}
        />
      </Container>
    );
  }
}
