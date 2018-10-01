import React from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';
import { observer, inject } from 'mobx-react';
import { SafeAreaView } from 'react-navigation';
import Lotties from '@lottie';
import Images from '@assets';

import withLoading from '../HOC/withLoading';
import ModalHeader from '../components/ModalHeader';
import BaseText from '../components/BaseText';
import BaseButton from '../components/BaseButton';

const { width: devideWidth } = Dimensions.get('window');

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: white;
`;

const Header = styled.View`
  flex: 1;
`;

const Body = styled.View`
  flex: 2;
  padding-horizontal: 24px;
  align-items: center;
  padding-top: 190px;
`;

const Bottom = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const Profile = styled(FastImage)`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  position: absolute;
  bottom: 114px;
`;

const UserNameText = styled(BaseText)`
  color: #2186f8;
  font-size: 20px;
  line-height: 30px;
`;

const DefaultText = styled(BaseText)`
  color: #333333;
  font-size: 20px;
  text-align: center;
  font-family: NanumSquareB;
  line-height: 30px;
`;

const InfoView = styled.View`
  width: ${devideWidth - 48}px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

const InfoText = styled(BaseText)`
  color: #333333;
  font-size: 14px;
  font-family: NanumSquareB;
  margin-right: 12px;
`;

const InfoDetailText = styled(BaseText)`
  color: #949494;
  font-size: 14px;
  flex: 1;
`;

const AbsoluteView = styled.View`
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 20px;
  align-self: center;
`;

const BottomRowView = styled.View`
  flex-direction: row;
  height: 50px;
`;

const CloseButton = styled(BaseButton)`
  flex: 1;
  background-color: #aaaaaa;
  justify-content: center;
  align-items: center;
`;

const ConfirmButton = styled(BaseButton)`
  flex: 1;
  background-color: #2186f8;
  justify-content: center;
  align-items: center;
`;

const BottomImage = styled(FastImage)`
width: 13px;
height: 13px;
'`;

@inject(stores => ({
  userStore: stores.store.userStore,
  roomStore: stores.store.roomStore,
}))
@withLoading
@observer
export default class MemberDetail extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    userStore: PropTypes.shape({}).isRequired,
    roomStore: PropTypes.shape({}).isRequired,
  };

  componentDidMount = () => {
    this.animation.play();
  };

  onClsoe = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  confirmMatch = async () => {
    const { userStore, roomStore, navigation } = this.props;
    const user = navigation.getParam('user');

    const params = {
      application_seq: user.application_seq,
      meeting_seq: user.meeting_seq,
    };

    const result = await roomStore.matchWith(params);

    if (result) {
      navigation.goBack();
    }

    roomStore.resetMyRooms();
    roomStore.fetchMyRoomsById(userStore.user_id);
  };

  render() {
    const { navigation, userStore } = this.props;
    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <ModalHeader title="" onClose={this.onClsoe} />
        </Header>
        <Body>
          <DefaultText>
            <UserNameText>{userStore.nickName}</UserNameText>
            {'님, \n'}
            <UserNameText>{user.nickname}</UserNameText>
            {'님과 함께 하시겠습니까?'}
          </DefaultText>
          <InfoView>
            <InfoRow>
              <InfoText>참여인원</InfoText>
              <InfoDetailText>{user.participants_cnt}</InfoDetailText>
            </InfoRow>
            <InfoRow>
              <InfoText>참여이유</InfoText>
              <InfoDetailText>{user.description}</InfoDetailText>
            </InfoRow>
          </InfoView>
        </Body>
        <Bottom>
          <BottomRowView>
            <CloseButton onPress={this.onClsoe}>
              <BottomImage source={Images.icon_X} />
            </CloseButton>
            <ConfirmButton onPress={this.confirmMatch}>
              <BottomImage source={Images.icon_O} />
            </ConfirmButton>
          </BottomRowView>
        </Bottom>

        <AbsoluteView pointerEvents="none">
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            source={Lotties.shape}
            autoPlay
            style={{ width: 500, height: 300 }}
          />
          <Profile
            source={{
              uri: `http://graph.facebook.com/v3.1/${user.user_id}/picture?type=large`,
            }}
          />
        </AbsoluteView>
      </Container>
    );
  }
}
