import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import Images from '@assets';
import FastImage from 'react-native-fast-image';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

import BaseText from '../components/BaseText';
import BaseButton from '../components/BaseButton';
import withLoading from '../HOC/withLoading';

const { width: deviceWidth } = Dimensions.get('window');

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const Header = styled.View`
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

const ContentPicture = styled(FastImage).attrs({ resizeMode: 'cover' })`
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

const MakeTimeLineBtn = styled(BaseButton).attrs({ underlayColor: 'transparent' })`
  position: absolute;
  bottom: 15px;
  right: 24px;
`;

const BlueBtnImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

@inject(stores => ({
  userStore: stores.store.userStore,
  contentStore: stores.store.contentStore,
  isLoading: stores.store.contentStore.isLoading,
}))
@withLoading
@observer
export default class Join extends Component {
  static navigationOptions = () => ({
    title: '지금한강',
    tabBarIcon: ({ tintColor }) => <TabIcon source={Images.bubble} style={{ tintColor }} />,
  });

  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    userStore: PropTypes.shape({}).isRequired,
    contentStore: PropTypes.shape({ allContents: PropTypes.arrayOf(PropTypes.shape({})) })
      .isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      evnetPage: 0,
    };
  }

  componentDidMount = () => {
    const { contentStore } = this.props;
    contentStore.fetchTodayContentsByOffset();
  };

  evnetkeyExtractor = (item, index) => `${index}`;

  contentKeyExtractor = item => `${item.timeline_seq}`;

  eventPagerEnd = e => {
    const { x } = e.nativeEvent.contentOffset;
    const evnetPage = Math.floor(x / deviceWidth);

    this.setState({ evnetPage });
  };

  makeTimeLine = () => {
    const { navigation } = this.props;
    navigation.navigate('MakeTimeLine');
  };

  refreshContents = async () => {
    this.setState({ refresh: true });
    const { contentStore } = this.props;
    contentStore.resetContents();

    await contentStore.fetchTodayContentsByOffset();
    this.setState({ refresh: false });
  };

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

  renderContents = ({ item }) => (
    <ContentsContainer>
      <ContentPicture source={{ uri: `${item.imageurl}` }}>
        <UserInfoView>
          <Profile
            source={{ uri: `http://graph.facebook.com/v3.1/${item.user_id}/picture?type=large` }}
          />
          <NickNameText>{item.nickname}</NickNameText>
          <LocationText>{item.location}</LocationText>
        </UserInfoView>
      </ContentPicture>
      <WritingView>
        <Writing>{item.content}</Writing>
      </WritingView>
    </ContentsContainer>
  );

  render() {
    const dummis = [...new Array(3)];
    const { contentStore } = this.props;
    const { refresh, evnetPage } = this.state;
    const { allContents } = contentStore;

    return (
      <Container>
        <PagerView>
          <EventPager
            data={dummis}
            renderItem={this.renderEvents}
            keyExtractor={this.evnetkeyExtractor}
            onMomentumScrollEnd={this.eventPagerEnd}
          />
          <IndicatorView>
            <IndicatorText>{`${evnetPage + 1} / 3`}</IndicatorText>
          </IndicatorView>
        </PagerView>
        <ContentsList
          data={allContents}
          refreshing={refresh}
          keyExtractor={this.contentKeyExtractor}
          ListHeaderComponent={this.renderListHeader}
          renderItem={this.renderContents}
          onRefresh={this.refreshContents}
        />
        <MakeTimeLineBtn onPress={this.makeTimeLine}>
          <BlueBtnImg source={Images.bt_plus_copy_2} />
        </MakeTimeLineBtn>;
      </Container>
    );
  }
}
