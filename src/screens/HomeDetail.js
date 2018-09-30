import _ from 'lodash';
import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import { observer, inject } from 'mobx-react';
import Images from '@assets';

import NaviHeader from '../components/NaviHeader';
import BaseButton from '../components/BaseButton';
import BaseText from '../components/BaseText';
import withLoading from '../HOC/withLoading';
import { dateUtils } from '../utils';

const { width: deviceWidth } = Dimensions.get('window');

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #2186f8;
`;

const Header = styled(LinearGradient)`
  flex: 1;
`;

const Body = styled.View`
  flex: 3;
  background-color: white;
`;

const TitleLists = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const TitleText = styled.Text`
  font-family: NanumSquareR;
  font-size: 18;
  font-weight: ${props => (props.select ? '800' : '400')};
  color: white;
`;

const TitleIcon = styled.Image.attrs({ resizeMode: 'contain' })`
  width: 42px;
  height: 39px;
`;

const ContentsList = styled.FlatList`
  flex: 1;
`;

const ContentView = styled(BaseButton)`
  flex: 1;
`;

const InfoView = styled.View`
  margin-left: 24px;
  justify-content: space-around;
`;

const DetailInfoView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
`;

const ProfileImg = styled(FastImage)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

const ContentTitle = styled.Text`
  font-family: NanumSquareR;
  font-size: 14;
`;

const ContentLocation = styled.Text`
  font-family: NanumSquareR;
  font-size: 12;
  color: #2186f8;
`;

const ContentDetailContent = styled.Text`
  font-family: NanumSquareR;
  font-size: 12;
  color: #666666;
`;

const Separator = styled.View`
  height: 1px;
  background-color: #dcdcdc;
`;

const MakeRoomBtn = styled(BaseButton)`
  position: absolute;
  bottom: 32px;
  right: 24px;
`;

const BlueBtnImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const InnerView = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 23px 24px 23px 24px;
  width: ${deviceWidth}px;
`;

const RowInfosView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 3px;
`;

const RowInfosImage = styled(FastImage)`
  width: 13px;
  height: 13px;
  margin-right: 5px;
`;

const LocationImage = styled(FastImage)`
  width: 11px;
  height: 14px;
  margin-right: 5px;
`;

const EmptyContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 122px;
`;

const EmptyImage = styled(FastImage)`
  width: 188px;
  height: 76px;
  align-self: center;
`;

const EmptyText = styled(BaseText)`
  font-size: 18px;
  color: #aaaaaa;
  text-align: center;
  margin-top: 41px;
`;

@inject(stores => ({
  roomStore: stores.store.roomStore,
  isLoading: stores.store.roomStore.isLoading,
}))
@withLoading
@observer
export default class HomeDetail extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      getParam: PropTypes.func,
    }).isRequired,
    roomStore: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      index: props.navigation.getParam('index'),
    };
  }

  back = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  changeIndex = async index => {
    const { roomStore } = this.props;

    if (index === this.state.index) {
      return;
    }

    try {
      await roomStore.fetchRoomsBySeqence(index);
      this.setState({ index });
    } catch (error) {
      setTimeout(() => {
        alert(error.message);
      }, 300);
    }
  };

  toDetail = seq => {
    try {
      const { navigation, roomStore } = this.props;
      const roomInfo = roomStore.getRoomInfoBySeq(seq);

      navigation.navigate('RoomIn', { roomInfo });
    } catch (error) {
      setTimeout(() => {
        alert(error.message);
      }, 300);
    }
  };

  makeRoom = () => {
    const { navigation } = this.props;
    const { index } = this.state;
    navigation.navigate('MakeRoom', { index });
  };

  renderCenterView = () => {
    const { index } = this.state;
    switch (index) {
      case 1:
        return <TitleIcon source={Images.chicken_icon_w} />;
      case 2:
        return <TitleIcon source={Images.cycle_w_icon} />;
      case 3:
        return <TitleIcon source={Images.duck_w_icon} />;
      case 4:
        return <TitleIcon source={Images.tent_icon} />;
      case 5:
        return <TitleIcon source={Images.camera_w_icon} />;
      case 6:
        return <TitleIcon source={Images.etc_w_icon} />;
      default:
        return null;
    }
  };

  renderItem = ({ item }) => (
    <ContentView onPress={_.partial(this.toDetail, item.meeting_seq)}>
      <InnerView>
        <ProfileImg
          source={{ uri: `http://graph.facebook.com/v3.1/${item.user_id}/picture?type=large` }}
        />
        <InfoView>
          <ContentTitle>{item.title}</ContentTitle>
          <RowInfosView>
            <LocationImage source={Images.icon_loca} />
            <ContentLocation>{item.meeting_location}</ContentLocation>
          </RowInfosView>
          <DetailInfoView>
            <RowInfosView>
              <RowInfosImage source={Images.icon_time} />
              <ContentDetailContent style={{ width: 90 }}>
                {dateUtils.toMMDDT(item.meeting_time)}
              </ContentDetailContent>
            </RowInfosView>
            <RowInfosView>
              <RowInfosImage source={Images.icon_people} />
              <ContentDetailContent style={{ width: 40 }}>
                {item.participants_cnt}명
              </ContentDetailContent>
            </RowInfosView>
            <RowInfosView>
              <RowInfosImage source={Images.icon_money} />
              <ContentDetailContent style={{ width: 60 }}>
                {item.expected_cost}원
              </ContentDetailContent>
            </RowInfosView>
          </DetailInfoView>
        </InfoView>
      </InnerView>
    </ContentView>
  );

  renderEmptyView = () => (
    <EmptyContainer>
      <EmptyImage source={Images.img_cute_2} />
      <EmptyText>{'모임이 없어요 :(\n한강모임을 만들어주세요'}(</EmptyText>
    </EmptyContainer>
  );

  render = () => {
    const { index } = this.state;
    const { roomStore } = this.props;
    const selectedRoom = roomStore.allRooms.filter(room => room.activity_seq === index);

    return (
      <Container>
        <Header colors={['#2186f8', '#1fa6df']}>
          <NaviHeader centerView={this.renderCenterView} onBack={this.back} />
          <TitleLists>
            <TitleText select={index === 1} onPress={_.partial(this.changeIndex, 1)}>
              치킨
            </TitleText>
            <TitleText select={index === 2} onPress={_.partial(this.changeIndex, 2)}>
              자전거
            </TitleText>
            <TitleText select={index === 3} onPress={_.partial(this.changeIndex, 3)}>
              오리배
            </TitleText>
            <TitleText select={index === 4} onPress={_.partial(this.changeIndex, 4)}>
              캠핑
            </TitleText>
            <TitleText select={index === 5} onPress={_.partial(this.changeIndex, 5)}>
              사진
            </TitleText>
            <TitleText select={index === 6} onPress={_.partial(this.changeIndex, 6)}>
              기타
            </TitleText>
          </TitleLists>
        </Header>
        <Body>
          <ContentsList
            data={selectedRoom}
            renderItem={this.renderItem}
            keyExtractor={item => `${item.meeting_seq}`}
            ItemSeparatorComponent={() => <Separator />}
            ListEmptyComponent={this.renderEmptyView}
          />
        </Body>
        <MakeRoomBtn onPress={this.makeRoom}>
          <BlueBtnImg source={Images.bt_plus_copy_2} />
        </MakeRoomBtn>
      </Container>
    );
  };
}
