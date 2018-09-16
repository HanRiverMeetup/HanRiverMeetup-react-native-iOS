import React from 'react';
import { Dimensions } from 'react-native';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import Images from '@assets';

import ModalHeader from '../components/ModalHeader';
import BaseButton from '../components/BaseButton';
import BaseText from '../components/BaseText';
import withLoading from '../HOC/withLoading';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const Container = styled.SafeAreaView`
  flex: 1;
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

const DatePickerView = styled(DatePicker)`
  width: ${deviceWidth};
  height: 10px;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 0px;
`;

const ProfileInfoView = styled.View`
  flex: 0.4;
  flex-direction: row;
  padding-horizontal: 24;
  align-items: center;
`;

const ArrowBottomImage = styled.Image`
  width: 21px;
  height: 13px;
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
  color: #2186f8;
`;

const BasicInfoText = styled(BaseText)`
  font-family: NanumSquareB;
  color: #333333;
  font-size: 14;
  margin-right: 7;
  width: 40px;
`;

const ContentsView = styled.View`
  flex: 1;
  padding-horizontal: 27px;
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

const RightButton = styled(BaseButton).attrs({ underlayColor: 'white' })`
  position: absolute;
  right: 23px;
  padding-top: 23.5px;
`;

const RightText = styled(BaseText)`
  font-size: 14;
  font-family: NanumSquareB;
  color: #949494;
  position: absolute;
  right: 23px;
  padding-top: 23.5px;
`;

@inject(stores => ({
  userStore: stores.store.userStore,
  roomStore: stores.store.roomStore,
  isLoading: stores.store.userStore.isLoading,
}))
@withLoading
@observer
class MakeRoom extends React.Component {
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
      title: '',
      meeting_location: '',
      meeting_time: '',
      participants_cnt: '',
      description: '',
      expected_cost: '',
      contact: '',
      lat: 10.0,
      lng: 10.0,
    };
  }

  onClsoe = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  onChangeTitle = text => {
    this.setState({ title: text });
  };

  onChangeLocation = text => {
    this.setState({ meeting_location: text });
  };

  onChangeTime = text => {
    this.setState({ meeting_time: text });
  };

  onChangePartiCount = text => {
    this.setState({ participants_cnt: text });
  };

  onChangeDesc = text => {
    this.setState({ description: text });
  };

  onChangeCost = text => {
    this.setState({ expected_cost: text });
  };

  onChangeContact = text => {
    this.setState({ contact: text });
  };

  // onChangeTitle = text => {
  //   this.setState({ lat: text });
  // };

  // onChangeTitle = text => {
  //   this.setState({ lng: text });
  // };

  registerRoom = async () => {
    const { userStore, roomStore, navigation } = this.props;
    const index = navigation.getParam('index');

    const {
      title,
      meeting_location,
      meeting_time,
      participants_cnt,
      description,
      expected_cost,
      contact,
      lat,
      lng,
    } = this.state;

    if (
      title.length *
        meeting_location.length *
        meeting_time.length *
        participants_cnt.length *
        description.length *
        expected_cost.length *
        contact.length ===
      0
    ) {
      alert('정보를 모두 입력해주세요!');
      return;
    }

    const params = {
      activity_seq: index,
      title,
      user_id: userStore.user_id,
      meeting_location,
      meeting_time: moment(this.formatDate).format('YYYY-MM-DD HH:MM:SS'),
      participants_cnt: parseInt(participants_cnt, 10),
      description,
      expected_cost: parseInt(expected_cost, 10),
      contact,
      lat,
      lng,
    };

    await roomStore.makeRoom(params);
  };

  renderTableView = () => (
    <TableContainer>
      <TableRow>
        <InfoInput
          placeholder="방이름을 입력해주세요!"
          onChangeText={this.onChangeTitle}
          value={this.state.title}
        />
      </TableRow>
      <TableRow>
        <BasicInfoText>위치</BasicInfoText>
        <InfoInput
          placeholder="뚝섬 유원지"
          onChangeText={this.onChangeLocation}
          value={this.state.meeting_location}
        />
        <RightButton>
          <ArrowBottomImage source={Images.down_arrow} />
        </RightButton>
      </TableRow>
      <TableRow>
        <BasicInfoText>시간</BasicInfoText>
        <DatePickerView
          date={this.state.meeting_time}
          locale="Ko"
          mode="datetime"
          placeholder="만남시간"
          format="MM월DD일, A hh:mm "
          confirmBtnText="확인"
          cancelBtnText="취소"
          customStyles={{
            dateIcon: { width: 0, height: 0 },
            dateInput: {
              marginLeft: 0,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              height: 43,
              marginTop: 0,
              width: 200,
              borderWidth: 0,
            },
            dateText: {
              color: '#2186f8',
              fontFamily: 'NanumSquareR',
              fontSize: 14,
            },
            placeholderText: {
              color: '#949494',
              fontFamily: 'NanumSquareR',
              fontSize: 14,
              opacity: 0.7,
            },
          }}
          onDateChange={(date, formatDate) => {
            this.setState({ meeting_time: date });
            this.formatDate = formatDate;
          }}
        />
        <RightButton>
          <ArrowBottomImage source={Images.down_arrow} />
        </RightButton>
      </TableRow>
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
        <BasicInfoText>회비</BasicInfoText>
        <InfoInput
          placeholder="0000"
          onChangeText={this.onChangeCost}
          value={this.state.expected_cost}
        />
        <RightText>원</RightText>
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
        <InfoInput
          placeholder="모임의 이야기를 들려주세요!"
          multiline
          onChangeText={this.onChangeDesc}
          value={this.state.description}
        />
      </ContentsView>
    </TableContainer>
  );

  render() {
    const { userStore } = this.props;

    return (
      <React.Fragment>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            height: deviceHeight + 100,
            paddingBottom: 50,
            backgroundColor: 'white',
          }}
        >
          <Container>
            <Header>
              <ModalHeader title="모임 만들기" onClose={this.onClsoe} />
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
        <Bottom>
          <BottomButton onPress={this.registerRoom}>
            <BottomButtonContaienr>
              <BottomText>게시판 등록하기</BottomText>
            </BottomButtonContaienr>
          </BottomButton>
        </Bottom>
      </React.Fragment>
    );
  }
}

export default MakeRoom;
