import _ from 'lodash';
import React, { Component } from 'react';
import { Animated, Dimensions, View } from 'react-native';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import { observer, inject } from 'mobx-react';

import NaviHeader from '../components/NaviHeader';
import BaseButton from '../components/BaseButton';
import BaseText from '../components/BaseText';
import withLoading from '../HOC/withLoading';
import { timeUtils } from '../utils';

const { width: deviceWidth } = Dimensions.get('window');
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
const AnimatedHeader = Animated.createAnimatedComponent(LinearGradient);

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

// const RegButton = styled.TouchableOpacity`
//   flex: 1;
//   height: 44px;
//   background-color: blue;
//   justify-content: center;
//   align-items: center;
// `;

const Bottom = styled.View`
  flex-direction: row;
  background-color: blue;
  border-top-color: #dcdcdc;
  border-top-width: 1px;
`;

const RegText = styled(BaseText)`
  font-family: NanumSquareB;
  font-size: 15.9;
  padding-horizontal: 12px;
  padding-vertical: 12px;
  position: absolute;
  z-index: 100;
  right: 0;
  background-color: #2186f8;
  height: 44px;
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
  margin-top: 11px;
`;

const KeyBoard = styled(KeyboardSpacer)`
  background-color: white;
`;

const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
    paddingBottom: 0,
    paddingTop: 60,
  },
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
  width: ${deviceWidth};
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

@inject(stores => ({
  userStore: stores.store.userStore,
  commentStore: stores.store.commentStore,
  isLoading: stores.store.commentStore.isLoading,
}))
@withLoading
@observer
class RoomIn extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
    commentStore: PropTypes.shape({}).isRequired,
    userStore: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      comment: '',
    };
  }

  componentDidMount = () => {
    const { commentStore, navigation } = this.props;
    const roomInfo = navigation.getParam('roomInfo');

    commentStore.fetchCommentByMeetingSeq(roomInfo.meeting_seq);
  };

  onKeyboard = show => {
    setTimeout(() => {
      if (show) {
        this.scrollRef.scrollToEnd({ animated: false });
      }
    }, 100);
  };

  onCommentChange = text => {
    this.setState({ comment: text });
  };

  onCommentReg = () => {
    const { comment } = this.state;
    const { userStore, commentStore, navigation } = this.props;
    const roomInfo = navigation.getParam('roomInfo');

    if (comment.length <= 0) {
      return;
    }

    const commentInfos = {
      comment,
      meeting_seq: roomInfo.meeting_seq,
      user_id: userStore.user_id,
    };

    commentStore.registerCommentByCommentInfo(commentInfos);
    this.scrollRef.scrollToEnd({ animated: true });
    this.setState({ comment: '' });
  };

  joinRoom = () => {
    const { navigation } = this.props;
    const roomInfo = navigation.getParam('roomInfo');
    navigation.navigate('JoinRoom', { roomInfo });
  };

  scrollRefInput = ref => {
    this.scrollRef = ref;
  };

  separator = () => <Separator />;

  back = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  renderCenterView = roomInfo => <HeaderText>{roomInfo.title}</HeaderText>;

  renderItem = ({ item }) => (
    <CommentListView>
      <UserInfoView>
        <MiniProfileView
          source={{ uri: `http://graph.facebook.com/v3.1/${item.user_id}/picture?type=large` }}
        />
        <TimeAndName>
          <CommentTitleText>{item.nickname}</CommentTitleText>
          <TimeText>{item.creation_time}</TimeText>
        </TimeAndName>
      </UserInfoView>
      <CommentText>{item.comment}</CommentText>
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
      inputRange: [0, 50, 100],
      outputRange: [160, 100, 65],
      extrapolate: 'clamp',
    });

    const { navigation, commentStore } = this.props;
    const roomInfo = navigation.getParam('roomInfo');
    const { comment } = this.state;

    const selectedComments = commentStore.allComments.filter(
      commentJSON => commentJSON.meeting_seq === roomInfo.meeting_seq
    );

    return (
      <Container>
        <Header colors={['#2186f8', '#1fa6df']} style={{ height: headerHeight }}>
          <NaviHeader
            style={{
              zIndex: 200,
              paddingTop: 10,
            }}
            centerView={_.partial(this.renderCenterView, roomInfo)}
            onBack={this.back}
          />
          <View style={{ flex: 1.3 }} />
        </Header>
        <Body>
          <ProfileView
            style={{
              width: imageLen,
              height: imageLen,
              borderRadius: imageRadius,
              marginTop: imageTranslate,
              opacity: imageOpacity,
            }}
            source={{
              uri: `http://graph.facebook.com/v3.1/${roomInfo.user_id}/picture?type=large`,
            }}
          />
          <Scroll
            innerRef={this.scrollRefInput}
            scrollEventThrottle={16}
            alwaysBounceVertical={false}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.state.scrollY } } },
            ])}
          >
            <ContentsView>
              <NameText>{roomInfo.nickname}</NameText>
              <InfoView>
                <LabelText>시간</LabelText>
                <LabelContent>{`${timeUtils.toTime(roomInfo.meeting_time)} / `}</LabelContent>
                <LabelText>인원</LabelText>
                <LabelContent>{`${roomInfo.participants_cnt}명 / `}</LabelContent>
                <LabelText>회비</LabelText>
                <LabelContent>{`${roomInfo.expected_cost}원`}</LabelContent>
              </InfoView>
              <LocationText>{roomInfo.meeting_location}</LocationText>
              <ContentText>{roomInfo.description}</ContentText>
              <JoinButton onPress={this.joinRoom}>
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
                data={selectedComments}
                renderItem={this.renderItem}
                keyExtractor={item => `${item.comment_seq}`}
                ItemSeparatorComponent={this.separator}
              />
            </CommentView>
          </Scroll>
          <Bottom>
            <ChatTextInput
              placeholder="궁금한 사항을 댓글로 물어보세요"
              onChangeText={this.onCommentChange}
              value={comment}
            />
            <BaseButton onPress={this.onCommentReg}>
              <RegText>등록</RegText>
            </BaseButton>
          </Bottom>
        </Body>
        <KeyBoard onToggle={this.onKeyboard} />
      </Container>
    );
  }
}

export default RoomIn;
