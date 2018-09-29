import React from 'react';
import { Dimensions } from 'react-native';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ModalHeader from '../components/ModalHeader';
import BaseButton from '../components/BaseButton';
import BaseText from '../components/BaseText';
import withLoading from '../HOC/withLoading';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const ScrollContainer = styled.View`
  flex: 1;
  background-color: white;
`;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const Header = styled.View`
  flex: 1;
`;

const Body = styled.View`
  flex: 5;
`;

const Bottom = styled.View`
  width: ${deviceWidth};
  height: 50px;
  background-color: white;
  bottom: 0px;
  position: absolute;
`;

const ProfileInfoView = styled.View`
  flex: 0.4;
  flex-direction: row;
  padding-horizontal: 24;
  align-items: center;
`;

const ProfileTouchView = styled(BaseButton)``;

const InnerProfileView = styled.View``;

const CircleProfile = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

const NameText = styled(BaseText)`
  font-family: NanumSquareB;
  font-size: 22;
  margin-left: 26;
  color: #333333;
`;

const TableContainer = styled.View`
  flex: 3;
`;

const TableRow = styled.View`
  border-bottom-color: #dcdcdc;
  border-bottom-width: 1;
  padding-horizontal: 24;
  padding-top: 23.5;
  padding-bottom: 13;
  flex-direction: row;
`;

const InfoInput = styled.TextInput`
  font-family: NanumSquareR;
  font-size: 14;
  color: #949494;
`;

const BasicInfoText = styled(BaseText)`
  font-family: NanumSquareB;
  color: #333333;
  font-size: 14;
  margin-right: 7;
  width: 40px;
`;

const ReasonText = styled(BaseText)`
  font-family: NanumSquareB;
  color: #333333;
  font-size: 14;
  margin-right: 7;
`;

const ContentsView = styled.View`
  flex: 1;
  padding-horizontal: 24px;
  padding-top: 19px;
`;

const BottomButton = styled(BaseButton)`
  flex: 1;
`;

const BottomButtonContaienr = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #aaaaaa;
  width: ${deviceWidth};
`;

const BottomText = styled(BaseText)`
  font-size: 14;
  font-family: NanumSquareB;
`;

const RightText = styled(BaseText)`
  font-size: 14;
  font-family: NanumSquareB;
  color: #949494;
  position: absolute;
  right: 23px;
  padding-top: 23.5px;
`;

const NoticeText = styled(BaseText)`
  color: #2186f8;
  font-size: 12;
  bottom: 66;
  align-self: center;
`;

@inject(stores => ({
  userStore: stores.store.userStore,
  roomStore: stores.store.roomStore,
  isLoading: stores.store.roomStore.isLoading,
}))
@withLoading
@observer
class JoinRoom extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
    userStore: PropTypes.shape({}).isRequired,
    roomStore: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      contact: '',
      description: '',
      participants_cnt: '',
    };
  }

  onClsoe = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  onChangeContact = text => {
    this.setState({ contact: text });
  };

  onChangeDesc = text => {
    this.setState({ description: text });
  };

  onChangePartiCount = text => {
    this.setState({ participants_cnt: text });
  };

  joinRoom = async () => {
    const { userStore, roomStore, navigation } = this.props;
    const roomInfo = navigation.getParam('roomInfo');

    const { participants_cnt, description, contact } = this.state;

    if (participants_cnt.length * description.length * contact.length === 0) {
      alert('정보를 모두 입력해주세요!');
      return;
    }

    const params = {
      contact,
      participants_cnt: parseInt(participants_cnt, 10),
      description,
      user_id: userStore.user_id,
      meeting_seq: roomInfo.meeting_seq,
    };

    try {
      const res = await roomStore.joinRoomByGuestInfos(params);

      if (res) {
        navigation.goBack();
      }
    } catch (error) {
      setTimeout(() => {
        alert(error);
      }, 300);
    }
  };

  renderTableView = () => (
    <TableContainer>
      <TableRow>
        <BasicInfoText>인원</BasicInfoText>
        <InfoInput
          placeholder="00"
          onChangeText={this.onChangePartiCount}
          value={this.state.participants_cnt}
        />
        <RightText>명</RightText>
      </TableRow>
      <TableRow>
        <BasicInfoText>연락처</BasicInfoText>
        <InfoInput
          placeholder="카카오 ID또는 전화번호 11자리"
          onChangeText={this.onChangeContact}
          value={this.state.contact}
        />
      </TableRow>
      <ContentsView>
        <ReasonText>참여 이유</ReasonText>
        <InfoInput
          placeholder="모임에 참여하게 된 이유를 적어주세요"
          multiline
          onChangeText={this.onChangeDesc}
          value={this.state.description}
        />
      </ContentsView>
    </TableContainer>
  );

  render() {
    const { userStore, navigation } = this.props;
    const roomInfo = navigation.getParam('roomInfo');

    return (
      <ScrollContainer>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            height: deviceHeight,
            paddingBottom: 50,
            backgroundColor: 'white',
          }}
        >
          <Container>
            <Header>
              <ModalHeader
                title={`${roomInfo.nickname} 님의\n모임에 참여하시겠습니까?`}
                onClose={this.onClsoe}
              />
            </Header>
            <Body>
              <ProfileInfoView>
                <ProfileTouchView>
                  <InnerProfileView>
                    <CircleProfile
                      source={{
                        uri: `http://graph.facebook.com/v3.1/${
                          userStore.user_id
                        }/picture?type=large`,
                      }}
                    />
                  </InnerProfileView>
                </ProfileTouchView>
                <NameText>{userStore.nickName}</NameText>
              </ProfileInfoView>
              {this.renderTableView()}
            </Body>
          </Container>
        </KeyboardAwareScrollView>
        <NoticeText>연락처는 매칭됐을 때만 상대방에게 공개됩니다.</NoticeText>
        <Bottom>
          <BottomButton onPress={this.joinRoom}>
            <BottomButtonContaienr>
              <BottomText>신청하기</BottomText>
            </BottomButtonContaienr>
          </BottomButton>
        </Bottom>
      </ScrollContainer>
    );
  }
}

export default JoinRoom;
