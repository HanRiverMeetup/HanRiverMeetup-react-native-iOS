import React, { Component } from 'react';
import { Animated, Dimensions, View } from 'react-native';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

import NaviHeader from '../components/NaviHeader';
import BaseButton from '../components/BaseButton';
import BaseText from '../components/BaseText';

const { width: deviceWidth } = Dimensions.get('window');
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
const AnimatedHeader = Animated.createAnimatedComponent(LinearGradient);
const DATAS = [
  {
    id: '0',
    text: '안녕하세요! 반갑습니다 저는 전날에 일이 있어서 조금 늦게 참석도 가능한가요?',
    imageUri: `https://unsplash.it/200/200?image=${Math.ceil(Math.random() * 10 + 1)}`,
  },
  {
    id: '1',
    text: '안녕하세요! 반갑습니다 저는 전날에 일이 있어서 조금 늦게 참석도 가능한가요?',
    imageUri: `https://unsplash.it/200/200?image=${Math.ceil(Math.random() * 10 + 1)}`,
  },
  {
    id: '2',
    text: '안녕하세요! 반갑습니다 저는 전날에 일이 있어서 조금 늦게 참석도 가능한가요?',
    imageUri: `https://unsplash.it/200/200?image=${Math.ceil(Math.random() * 10 + 1)}`,
  },
  {
    id: '3',
    text: '안녕하세요! 반갑습니다 저는 전날에 일이 있어서 조금 늦게 참석도 가능한가요?',
    imageUri: `https://unsplash.it/200/200?image=${Math.ceil(Math.random() * 10 + 1)}`,
  },
  {
    id: '4',
    text: '안녕하세요! 반갑습니다 저는 전날에 일이 있어서 조금 늦게 참석도 가능한가요?',
    imageUri: `https://unsplash.it/200/200?image=${Math.ceil(Math.random() * 10 + 1)}`,
  },
  {
    id: '5',
    text: '안녕하세요! 반갑습니다 저는 전날에 일이 있어서 조금 늦게 참석도 가능한가요?',
    imageUri: `https://unsplash.it/200/200?image=${Math.ceil(Math.random() * 10 + 1)}`,
  },
];

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #2186f8;
`;

const Header = styled(AnimatedHeader)``;

const Body = styled.View`
  flex: 3;
  background-color: white;
  border-bottom-color: #dcdcdc;
  border-bottom-width: 1;
`;

const ChatTextInput = styled.TextInput`
  background-color: white;
  height: 44px;
  padding-left: 24px;
  justify-content: center;
  flex: 3.5;
`;

const RegButton = styled(BaseButton)`
  flex: 1;
  height: 44px;
`;

const Bottom = styled.View`
  flex: 0.3;
  flex-direction: row;
`;

const RegText = styled(BaseText)`
  font-family: NanumSquareB;
  font-size: 15.9;
`;

const NameText = styled(BaseText)`
  color: black;
  font-size: 14;
  text-align: center;
  margin-top: 10px;
`;

const LocationText = styled(BaseText)`
  color: #2186f8;
  margin-top: 12px;
  font-size: 12;
  text-align: center;
`;

const LabelText = styled(BaseText)`
  color: #666666;
  font-size: 12;
`;

const LabelContent = styled(BaseText)`
  font-family: NanumSquareB;
  color: #666666;
  font-size: 12;
`;

const ContentText = styled(BaseText)`
  color: #666666;
  font-size: 12;
  line-height: 19px;
  padding-horizontal: 23px;
  margin-top: 11px;
`;

const KeyBoard = styled(KeyboardSpacer)``;

const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: { alignItems: 'center', paddingBottom: 30, paddingTop: 60 },
})``;

const HeaderText = styled(BaseText)`
  font-size: 18;
  font-weight: 400;
`;

const ContentsView = styled.View``;

const CommentView = styled.View`
  padding-top: 31px;
  align-items: center;
`;

const InfoView = styled.View`
  flex-direction: row;
  margin-top: 11px;
  justify-content: center;
`;

const JoinButton = styled(BaseButton)`
  margin-top: 36px;
`;

const JoinView = styled(LinearGradient)`
  height: 46px;
  width: ${deviceWidth - 48}px;
  padding: 1.5px;
`;

const JoinInnerView = styled.View`
  flex: 1;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const CommentsList = styled.FlatList`
  border-top-width: 1px;
  border-top-color: #dcdcdc;
  margin-top: 9px;
`;

const CommentText = styled(BaseText)`
  margin-top: 14;
  color: #666666;
  font-size: 12;
`;

const CommentListView = styled.View`
  padding: 11px 24px 22px 24px;
`;

const JoinText = styled(BaseText)`
  color: #2186f8;
  font-size: 14;
  font-family: NanumSquareB;
`;

const CommentTitleText = styled(BaseText)`
  color: black;
  font-size: 14;
  font-family: NanumSquareB;
  text-align: center;
`;

const TimeText = styled(BaseText)`
  color: #b1b1b1;
  font-size: 12;
  margin-top: 3;
`;

const Separator = styled.View`
  height: 1;
  background-color: #dcdcdc;
`;

const UserInfoView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TimeAndName = styled.View``;

const ProfileView = styled(AnimatedFastImage)`
  background-color: #dcdcdc;
  align-self: center;
  position: absolute;
  z-index: 100;
`;

const MiniProfileView = styled(FastImage)`
  width: 34;
  height: 34;
  border-radius: 17;
  background-color: #b1b1b1;
  margin-right: 7;
`;

class RoomIn extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      imgShown: true,
    };
  }

  onKeyboard = (showm, height) => {
    console.log(showm, height);
    this.setState({ imgShown: !showm });
  };

  separator = () => <Separator />;

  back = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  renderCenterView = () => <HeaderText>영수와 함께하는 한강여행!</HeaderText>;

  renderItem = ({ item }) => (
    <CommentListView>
      <UserInfoView>
        <MiniProfileView source={{ uri: item.imageUri }} />
        <TimeAndName>
          <CommentTitleText>USER1</CommentTitleText>
          <TimeText>45분전</TimeText>
        </TimeAndName>
      </UserInfoView>
      <CommentText>{item.text}</CommentText>
    </CommentListView>
  );

  render() {
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, 40],
      outputRange: [-55, -95],
      extrapolate: 'clamp',
    });

    const imageLen = this.state.scrollY.interpolate({
      inputRange: [0, 40],
      outputRange: [110, 90],
      extrapolate: 'clamp',
    });

    const imageRadius = this.state.scrollY.interpolate({
      inputRange: [0, 40],
      outputRange: [55, 45],
      extrapolate: 'clamp',
    });

    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, 20, 40],
      outputRange: [1, 0.5, 0],
      extrapolate: 'clamp',
    });

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, 40],
      outputRange: [160, 65],
      extrapolate: 'clamp',
    });

    const { imgShown } = this.state;

    console.log('headerHight', headerHeight);

    return (
      <Container>
        <Header colors={['#2186f8', '#1fa6df']} style={{ height: headerHeight }}>
          <NaviHeader
            style={{
              zIndex: 200,
              paddingTop: 10,
            }}
            centerView={this.renderCenterView}
            onBack={this.back}
          />
          <View style={{ flex: 1.3 }} />
        </Header>
        <Body>
          {imgShown && (
            <ProfileView
              style={{
                width: imageLen,
                height: imageLen,
                borderRadius: imageRadius,
                marginTop: imageTranslate,
                opacity: imageOpacity,
              }}
              source={{
                uri: `https://unsplash.it/200/200?image=${Math.ceil(Math.random() * 10 + 1)}`,
              }}
            />
          )}
          <Scroll
            scrollEventThrottle={16}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.state.scrollY } } },
            ])}
          >
            <ContentsView>
              <NameText>조영니</NameText>
              <InfoView>
                <LabelText>시간</LabelText>
                <LabelContent>11:00 / </LabelContent>
                <LabelText>인원</LabelText>
                <LabelContent>15명 / </LabelContent>
                <LabelText>회비</LabelText>
                <LabelContent>20,000원</LabelContent>
              </InfoView>
              <LocationText>여의도 한강공원</LocationText>
              <ContentText>
                난지 캠핑장에서 캠핑하실 분들 구합니다. 저는 모든 장비를갖추 고 있어서 바베큐 파티에
                쓸 고기만 사서 우리 같이 놀아봐요!ㅁ! 구합니다. 저는 모든 장비를 갖추고 있어서
                바베큐 파티에 쓸 고기만 사서 우리 같이 놀아봐요!ㅁ
              </ContentText>
              <JoinButton onPress={() => alert('touch!')}>
                <JoinView colors={['#2186f8', '#00c0c9']}>
                  <JoinInnerView>
                    <JoinText>참여하기</JoinText>
                  </JoinInnerView>
                </JoinView>
              </JoinButton>
            </ContentsView>
            <CommentView>
              <CommentTitleText>댓글</CommentTitleText>
              <CommentsList
                data={DATAS}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={this.separator}
              />
            </CommentView>
          </Scroll>
        </Body>
        <Bottom>
          <ChatTextInput placeholder="궁금한 사항을 댓글로 물어보세요" />
          <RegButton>
            <RegText>등록</RegText>
          </RegButton>
        </Bottom>
        <KeyBoard topSpacing={26} onToggle={(shown, height) => this.onKeyboard(shown, height)} />
      </Container>
    );
  }
}

export default RoomIn;
