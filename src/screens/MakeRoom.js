import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Images from '@assets';

import WithLoadingContainer from '../components/WithLoadingContainer';
import ModalHeader from '../components/ModalHeader';
import BaseButton from '../components/BaseButton';
import BaseText from '../components/BaseText';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const LoadingContainer = styled(WithLoadingContainer)``;

const Header = styled.View`
  flex: 1;
`;

const Body = styled.View`
  flex: 4.5;
`;

const Bottom = styled.View`
  flex: 0.6;
  background-color: white;
`;

const ProfileInfoView = styled.View`
  flex: 1;
  flex-direction: row;
  padding-horizontal: 24;
  align-items: center;
`;

const ProfileTouchView = styled(BaseButton)``;

const InnerProfileView = styled.View``;

const CircleProfile = styled.Image`
  width: 60;
  height: 60;
`;

const AddButton = styled.Image`
  width: 21;
  height: 21;
  position: absolute;
  bottom: 0;
  right: -5;
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
  font-size: 12;
  color: #949494;
`;

const BasicInfoText = styled(BaseText)`
  font-family: NanumSquareB;
  color: #333333;
  font-size: 12;
  margin-right: 7;
`;

const ContentsView = styled.View`
  flex: 1;
  padding-vertical: 25;
  padding-horizontal: 27;
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

class MakeRoom extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  onClsoe = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  registerRoom = () => {
    alert('Register room!');
  };

  renderTableView = () => (
    <TableContainer>
      <TableRow>
        <InfoInput placeholder="방이름을 입력해주세요!" />
      </TableRow>
      <TableRow>
        <BasicInfoText>위치</BasicInfoText>
      </TableRow>
      <TableRow>
        <BasicInfoText>시간</BasicInfoText>
        <InfoInput placeholder="11:00 - 14:00" />
      </TableRow>
      <TableRow>
        <BasicInfoText>인원</BasicInfoText>
        <InfoInput placeholder="20명" />
      </TableRow>
      <TableRow>
        <BasicInfoText>회비</BasicInfoText>
        <InfoInput placeholder="0000원" />
      </TableRow>
    </TableContainer>
  );

  renderWriteContentsView = () => (
    <ContentsView>
      <InfoInput placeholder="모임의 이야기를 들려주세요!" />
    </ContentsView>
  );

  render() {
    const { loading } = this.state;
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{ height: deviceHeight }}
        scrollEnabled={false}
      >
        <LoadingContainer isLoading={loading}>
          <Header>
            <ModalHeader title="방 만들기" onClose={this.onClsoe} />
          </Header>
          <Body>
            <ProfileInfoView>
              <ProfileTouchView>
                <InnerProfileView>
                  <CircleProfile source={Images.profile_img} />
                  <AddButton source={Images.add_button} />
                </InnerProfileView>
              </ProfileTouchView>
              <NameText>조영니</NameText>
            </ProfileInfoView>
            {this.renderTableView()}
            {this.renderWriteContentsView()}
          </Body>
          <Bottom>
            <BottomButton onPress={this.registerRoom}>
              <BottomButtonContaienr>
                <BottomText>게시판 등록하기</BottomText>
              </BottomButtonContaienr>
            </BottomButton>
          </Bottom>
        </LoadingContainer>
      </KeyboardAwareScrollView>
    );
  }
}

export default MakeRoom;
