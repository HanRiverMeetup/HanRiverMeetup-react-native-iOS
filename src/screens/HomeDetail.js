import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import Images from '@assets';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

import NaviHeader from '../components/NaviHeader';
import BaseButton from '../components/BaseButton';
import WithLoadingContainer from '../components/WithLoadingContainer';

const { width: deviceWidth } = Dimensions.get('window');

const LoadingContainer = styled(WithLoadingContainer)`
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
  font-weight: ${props => (props.select ? '900' : '400')};
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

const ContentDetailTitle = styled.Text`
  font-family: NanumSquareR;
  font-size: 12;
  color: #949494;
`;

const ContentDetailContent = styled.Text`
  font-family: NanumSquareR;
  font-size: 12;
  color: #666666;
  margin-right: 10px;
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

const DATAS = [
  {
    profileImg: `https://unsplash.it/200/200?image=${Math.ceil(Math.random() * 10 + 1)}`,
    contentTitle: '주말에 난지에서 캠핑할 분 구해요!',
    location: '여의도 한강공원',
    time: 'PM 11:00',
    members: 5,
    money: '20,000원',
  },
  {
    profileImg: `https://unsplash.it/200/200?image=${Math.ceil(Math.random() * 10 + 1)}`,
    contentTitle: '주말에 난지에서 캠핑할 분 구해요!',
    location: '여의도 한강공원2',
    time: 'PM 11:00',
    members: 5,
    money: '20,000원',
  },
  {
    profileImg: `https://unsplash.it/200/200?image=${Math.ceil(Math.random() * 10 + 1)}`,
    contentTitle: '주말에 난지에서 캠핑할 분 구해요!',
    location: '여의도 한강공원3',
    time: 'PM 11:00',
    members: 5,
    money: '20,000원',
  },
  {
    profileImg: `https://unsplash.it/200/200?image=${Math.ceil(Math.random() * 10 + 1)}`,
    contentTitle: '주말에 난지에서 캠핑할 분 구해요!',
    location: '여의도 한강공원4',
    time: 'PM 11:00',
    members: 5,
    money: '20,000원',
  },
  {
    profileImg: `https://unsplash.it/200/200?image=${Math.ceil(Math.random() * 10 + 1)}`,
    contentTitle: '주말에 난지에서 캠핑할 분 구해요!',
    location: '여의도 한강공원5',
    time: 'PM 11:00',
    members: 5,
    money: '20,000원',
  },
];

export default class Home extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      getParam: PropTypes.func,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      index: props.navigation.getParam('index'),
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true }, () =>
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 1500)
    );
  }

  back = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  changeIndex = index => {
    this.setState({ index, isLoading: true }, () =>
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 1500)
    );
  };

  toDetail = () => {
    const { navigation } = this.props;
    navigation.navigate('RoomIn');
  };

  makeRoom = () => {
    const { navigation } = this.props;
    navigation.navigate('MakeRoom');
  };

  renderCenterView = () => {
    const { index } = this.state;
    switch (index) {
      case 0:
        return <TitleIcon source={Images.chicken_icon_w} />;
      case 1:
        return <TitleIcon source={Images.cycle_w_icon} />;
      case 2:
        return <TitleIcon source={Images.duck_w_icon} />;
      case 3:
        return <TitleIcon source={Images.tent_icon} />;
      case 4:
        return <TitleIcon source={Images.camera_w_icon} />;
      case 5:
        return <TitleIcon source={Images.etc_w_icon} />;
      default:
        return null;
    }
  };

  renderItem = ({ item }) => (
    <ContentView onPress={this.toDetail}>
      <InnerView>
        <ProfileImg source={{ uri: item.profileImg }} />
        <InfoView>
          <ContentTitle>{item.contentTitle}</ContentTitle>
          <ContentLocation>{item.location}</ContentLocation>
          <DetailInfoView>
            <ContentDetailTitle>시간</ContentDetailTitle>
            <ContentDetailContent>{item.time}</ContentDetailContent>
            <ContentDetailTitle>인원</ContentDetailTitle>
            <ContentDetailContent>{item.members}</ContentDetailContent>
            <ContentDetailTitle>회비</ContentDetailTitle>
            <ContentDetailContent>{item.money}</ContentDetailContent>
          </DetailInfoView>
        </InfoView>
      </InnerView>
    </ContentView>
  );

  render() {
    const { index, isLoading } = this.state;
    return (
      <LoadingContainer isLoading={isLoading}>
        <Header colors={['#2186f8', '#1fa6df']}>
          <NaviHeader centerView={this.renderCenterView} onBack={this.back} />
          <TitleLists>
            <TitleText select={index === 0} onPress={() => this.changeIndex(0)}>
              치킨
            </TitleText>
            <TitleText select={index === 1} onPress={() => this.changeIndex(1)}>
              자전거
            </TitleText>
            <TitleText select={index === 2} onPress={() => this.changeIndex(2)}>
              오리배
            </TitleText>
            <TitleText select={index === 3} onPress={() => this.changeIndex(3)}>
              캠핑
            </TitleText>
            <TitleText select={index === 4} onPress={() => this.changeIndex(4)}>
              사진
            </TitleText>
            <TitleText select={index === 5} onPress={() => this.changeIndex(5)}>
              기타
            </TitleText>
          </TitleLists>
        </Header>
        <Body>
          <ContentsList
            data={DATAS}
            renderItem={this.renderItem}
            keyExtractor={item => item.location}
            ItemSeparatorComponent={() => <Separator />}
          />
        </Body>
        <MakeRoomBtn onPress={this.makeRoom}>
          <BlueBtnImg source={Images.bt_plus} />
        </MakeRoomBtn>
      </LoadingContainer>
    );
  }
}
