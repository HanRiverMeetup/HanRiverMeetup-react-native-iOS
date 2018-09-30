import _ from 'lodash';
import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import Images from '@assets';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import { observer, inject } from 'mobx-react';
import * as Animatable from 'react-native-animatable';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import BaseButton from '../components/BaseButton';
import BaseText from '../components/BaseText';
import withLoading from '../HOC/withLoading';
import MyRooms from '../components/MyRooms';
import { dateUtils } from '../utils/dateUtils';

const { height: deviceHeight } = Dimensions.get('window');

const PinImage = styled(FastImage)`
  width: 10px;
  height: 13px;
  margin-right: 9px;
`;

const ListView = styled.View`
  padding-vertical: 25px;
  padding-horizontal: 24px;
  padding-top: 23px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SkyBlueLabel = styled.View`
  width: 4px;
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  background-color: #2186f8;
`;

const MintLabel = styled.View`
  width: 4px;
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  background-color: #00c0c9;
`;

const CardTitle = styled(BaseText)`
  font-family: NanumSquareB;
  color: #333333;
  font-size: 14px;
`;

const SubTitleView = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: 9px;
`;

const CardSubTitle = styled(BaseText)`
  color: #949494;
  font-size: 12px;
  margin-right: 9px;
`;

const Header = styled.View`
  padding-top: 58px;
  padding-horizontal: 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const ProfileInfoView = styled.View`
  flex-direction: row;
  padding-horizontal: 24;
  align-items: center;
  margin-top: 57px;
`;

const ProfileTouchView = styled(BaseButton)``;

const InnerProfileView = styled.View``;

const CircleProfile = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

const NameText = styled(BaseText)`
  font-family: NanumSquareB;
  font-size: 22;
  margin-left: 26;
  color: #333333;
`;

const HeaderTitle = styled.Text`
  font-family: NanumSquareR;
  font-size: 22;
`;

const RoomList = styled.FlatList.attrs({ contentContainerStyle: { paddingBottom: 30 } })`
  border-top-color: #dcdcdc;
  border-top-width: 1;
`;

const PlusButton = styled(FastImage)`
  width: 33px;
  height: 33px;
  border-radius: 16.5px;
  position: absolute;
  bottom: 0px;
  right: 0px;
`;

const TabIcon = styled.Image`
  width: 18px;
  height: 18px;
`;

const RightView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 66px;
`;

const HeaderImage = styled(FastImage)`
  width: 20px;
  height: 20px;
`;

const CategoryView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  margin-bottom: 24px;
  padding-horizontal: 45px;
  padding-top: 34px;
`;

const ContactText = styled(BaseText)`
  color: #42c9d1;
  font-size: 14px;
  font-family: NanumSquareB;
`;

const CategoryTouch = styled(BaseButton)``;

const CategoryText0 = styled(BaseText)`
  color: ${({ selected }) => (selected ? '#2186f8' : '#b1b1b1')};
  font-weight: ${({ selected }) => (selected ? '800' : '400')};
`;

const CategoryText1 = styled(BaseText)`
  color: ${({ selected }) => (selected ? '#00c0c9' : '#b1b1b1')};
  font-weight: ${({ selected }) => (selected ? '800' : '400')};
`;

const CategoryText2 = styled(BaseText)`
  color: ${({ selected }) => (selected ? '#333333' : '#b1b1b1')};
  font-weight: ${({ selected }) => (selected ? '800' : '400')};
`;

const Separator = styled.View`
  height: 1px;
  background-color: #dcdcdc;
`;

const RequestView = styled.View``;

const RoomImage = styled(FastImage)`
  width: 36px;
  height: 36px;
`;

const BlueDot = styled.View`
  background-color: #2186f8;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  position: absolute;
  right: 35px;
  top: 0px;
`;

const HeaderContainer = styled.View`
  height: 250px;
`;

const BodyContainer = styled.View`
  height: ${deviceHeight - 50}px;
`;

@inject(stores => ({
  userStore: stores.store.userStore,
  roomStore: stores.store.roomStore,
  alarmStore: stores.store.alarmStore,
  isLoading: stores.store.roomStore.isLoading || stores.store.alarmStore.isLoading,
}))
@withLoading
@observer
export default class MyPage extends Component {
  static navigationOptions = () => ({
    title: '난누굴강',
    tabBarIcon: ({ tintColor }) => <TabIcon source={Images.icon_rows} style={{ tintColor }} />,
  });

  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    userStore: PropTypes.shape({}).isRequired,
    roomStore: PropTypes.shape({}).isRequired,
    alarmStore: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      categoryIndex: 0,
      refresh: false,
    };
  }

  componentDidMount = () => {
    const { alarmStore, roomStore, userStore } = this.props;
    roomStore.fetchMyRoomsById(userStore.user_id);
    alarmStore.fetchAlarmsById(userStore.user_id);
  };

  onPressProfile = user => {
    const { navigation } = this.props;
    navigation.navigate('MemberDetail', { user });
  };

  refreshMyRooms = async () => {
    this.setState({ refresh: true });
    const { roomStore, userStore } = this.props;
    roomStore.resetMyRooms();
    await roomStore.fetchMyRoomsById(userStore.user_id);
    this.setState({ refresh: false });
  };

  changeCategory = categoryIndex => {
    this.setState({ categoryIndex });

    if (categoryIndex === 0) {
      const { roomStore, userStore } = this.props;
      roomStore.fetchMyRoomsById(userStore.user_id);

      return;
    }

    if (categoryIndex === 1) {
      const { roomStore, userStore } = this.props;
      roomStore.fetchRequestRoomsById(userStore.user_id);

      return;
    }

    if (categoryIndex === 2) {
      const { roomStore, userStore } = this.props;
      roomStore.fetchMatchCompletedById(userStore.user_id);
    }
  };

  contactSeq = seq => {
    if (seq === 0) {
      return <ContactText>대기중</ContactText>;
    }

    return <ContactText>매칭실패</ContactText>;
  };

  myRoom = userId => {
    const { userStore } = this.props;
    const { user_id } = userStore;

    if (user_id === userId) {
      return <RoomImage source={Images.icon_myRoom} />;
    }

    return <RoomImage source={Images.icon_othersRoom} />;
  };

  myRoomLabel = userId => {
    const { userStore } = this.props;

    if (userStore.user_id === userId) {
      return <SkyBlueLabel />;
    }

    return <MintLabel />;
  };

  showAlarms = () => {
    const { navigation } = this.props;
    navigation.navigate('Alarms');
  };

  keyExtractor = item => `${item.meeting_seq}`;

  renderMyRoomList = ({ item, index }) => (
    <MyRooms item={item} index={index} onPressProfile={this.onPressProfile} />
  );

  renderRequestRoomList = ({ item }) => (
    <ListView>
      <MintLabel />
      <RequestView>
        <CardTitle>{item.title}</CardTitle>

        <SubTitleView>
          <PinImage source={Images.icon_pin} />
          <CardSubTitle>{item.meeting_location}</CardSubTitle>
          <CardSubTitle>{dateUtils.toKRDate(item.meeting_time)}</CardSubTitle>
        </SubTitleView>
      </RequestView>
      {this.contactSeq(item.contact_seq)}
    </ListView>
  );

  renderCompletedRoomList = ({ item }) => (
    <ListView>
      {this.myRoomLabel(item.user_id)}
      <RequestView>
        <CardTitle>{item.title}</CardTitle>

        <SubTitleView>
          <PinImage source={Images.icon_pin} />
          <CardSubTitle>{item.meeting_location}</CardSubTitle>
          <CardSubTitle>{dateUtils.toKRDate(item.meeting_time)}</CardSubTitle>
        </SubTitleView>
      </RequestView>
      {this.myRoom(item.user_id)}
    </ListView>
  );

  renderForeground = () => {
    const { userStore } = this.props;
    const { nickName } = userStore;

    return (
      <HeaderContainer>
        <Header>
          <HeaderTitle>{`안녕하세요\n${nickName}님 반가워요`}</HeaderTitle>
          <RightView>
            <BaseButton onPress={this.showAlarms}>
              <Animatable.Image
                source={Images.shape_595}
                style={{ width: 20, height: 20 }}
                animation="tada"
                iterationCount="infinite"
              />
            </BaseButton>
            <BlueDot />
            <HeaderImage source={Images.shape_546} />
          </RightView>
        </Header>
        <ProfileInfoView>
          <ProfileTouchView>
            <InnerProfileView>
              <CircleProfile
                source={{
                  uri: `http://graph.facebook.com/v3.1/${userStore.user_id}/picture?type=large`,
                }}
              />
              <PlusButton source={Images.bt_plus_copy_2} />
            </InnerProfileView>
          </ProfileTouchView>
          <NameText>{userStore.nickName}</NameText>
        </ProfileInfoView>
      </HeaderContainer>
    );
  };

  render() {
    const { roomStore } = this.props;
    const { categoryIndex, refresh } = this.state;
    const { myAllRooms, requestAllRooms, completedAllRooms } = roomStore;

    return (
      <ParallaxScrollView
        backgroundColor="white"
        parallaxHeaderHeight={250}
        renderForeground={this.renderForeground}
      >
        <BodyContainer>
          <CategoryView>
            <CategoryTouch onPress={_.partial(this.changeCategory, 0)}>
              <CategoryText0 selected={categoryIndex === 0}>만든모임</CategoryText0>
            </CategoryTouch>
            <CategoryTouch onPress={_.partial(this.changeCategory, 1)}>
              <CategoryText1 selected={categoryIndex === 1}>신청모임</CategoryText1>
            </CategoryTouch>
            <CategoryTouch onPress={_.partial(this.changeCategory, 2)}>
              <CategoryText2 selected={categoryIndex === 2}>완료모임</CategoryText2>
            </CategoryTouch>
          </CategoryView>
          {categoryIndex === 0 && (
            <RoomList
              data={myAllRooms}
              refreshing={refresh}
              renderItem={this.renderMyRoomList}
              keyExtractor={this.keyExtractor}
              ItemSeparatorComponent={() => <Separator />}
              onRefresh={this.refreshMyRooms}
              length={myAllRooms.length}
            />
          )}
          {categoryIndex === 1 && (
            <RoomList
              data={requestAllRooms}
              refreshing={refresh}
              renderItem={this.renderRequestRoomList}
              keyExtractor={this.keyExtractor}
              ItemSeparatorComponent={() => <Separator />}
              onRefresh={() => {}}
            />
          )}
          {categoryIndex === 2 && (
            <RoomList
              refreshing={refresh}
              data={completedAllRooms}
              renderItem={this.renderCompletedRoomList}
              keyExtractor={this.keyExtractor}
              ItemSeparatorComponent={() => <Separator />}
              onRefresh={() => {}}
            />
          )}
        </BodyContainer>
      </ParallaxScrollView>
    );
  }
}
