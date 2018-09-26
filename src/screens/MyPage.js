import React, { Component } from 'react';
import styled from 'styled-components';
import Images from '@assets';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import { observer, inject } from 'mobx-react';

import BaseButton from '../components/BaseButton';
import BaseText from '../components/BaseText';
import withLoading from '../HOC/withLoading';
import MyRooms from '../components/MyRooms';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const Header = styled.View`
  flex: 1;
  padding-top: 38px;
  padding-horizontal: 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const Body = styled.View`
  flex: 4;
`;

const ProfileInfoView = styled.View`
  flex-direction: row;
  padding-horizontal: 24;
  align-items: center;
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

const List = styled.FlatList`
  flex: 1;
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

const CategoryText = styled(BaseText)`
  color: ${({ selected }) => (selected ? '#2186f8' : '#b1b1b1')};
  font-weight: ${({ selected }) => (selected ? '800' : '400')};
`;

const Separator = styled.View`
  height: 1px;
  background-color: #dcdcdc;
`;

@inject(stores => ({
  userStore: stores.store.userStore,
  roomStore: stores.store.roomStore,
}))
@withLoading
@observer
export default class MyPage extends Component {
  static navigationOptions = () => ({
    title: '난누굴강',
    tabBarIcon: ({ tintColor }) => <TabIcon source={Images.rectangle} style={{ tintColor }} />,
  });

  static propTypes = {
    userStore: PropTypes.shape({}).isRequired,
    roomStore: PropTypes.shape({}).isRequired,
  };

  componentDidMount = () => {
    const { roomStore, userStore } = this.props;
    roomStore.fetchMyRoomsById(userStore.user_id);
  };

  keyExtractor = item => `${item.meeting_seq}`;

  renderList = ({ item, index }) => {
    return <MyRooms item={item} index={index} />;
  };

  render() {
    const { userStore, roomStore } = this.props;
    const { nickName } = userStore;
    const { myAllRooms } = roomStore;

    return (
      <Container>
        <Header>
          <HeaderTitle>{`안녕하세요\n${nickName}님 반가워요`}</HeaderTitle>
          <RightView>
            <HeaderImage source={Images.shape_546} />
            <HeaderImage source={Images.shape_595} />
          </RightView>
        </Header>
        <Body>
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
          <CategoryView>
            <CategoryText selected>만든모임</CategoryText>
            <CategoryText>신청모임</CategoryText>
            <CategoryText>완료모임</CategoryText>
          </CategoryView>
          <List
            data={myAllRooms}
            renderItem={this.renderList}
            keyExtractor={this.keyExtractor}
            ItemSeparatorComponent={() => <Separator />}
          />
        </Body>
      </Container>
    );
  }
}
