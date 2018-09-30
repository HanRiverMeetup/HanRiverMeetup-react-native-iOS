import React from 'react';
import { Dimensions } from 'react-native';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';
import Images from '@assets';
import ImagePicker from 'react-native-image-crop-picker';

import ModalHeader from '../components/ModalHeader';
import BaseButton from '../components/BaseButton';
import BaseText from '../components/BaseText';
import withLoading from '../HOC/withLoading';
import LocationModal from '../components/LocationModal';

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
  padding-top: 36px;
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
  background-color: #2186f8;
  width: ${deviceWidth};
`;

const BottomText = styled(BaseText)`
  font-size: 14;
  font-family: NanumSquareB;
`;

const AddButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const AddImageButton = styled(BaseButton).attrs({ underlayColor: 'transparent' })`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border-color: gray;
  border-width: 1px;
  border-style: dashed;
`;

const PlusImage = styled(FastImage)`
  width: 18px;
  height: 18px;
`;

const AddImageText = styled(BaseText)`
  color: #949494;
  font-size: 14px;
  text-align: center;
  margin-top: 11px;
`;

const RightButton = styled(BaseButton).attrs({ underlayColor: 'white' })`
  position: absolute;
  right: 23px;
  padding-top: 23.5px;
`;

const ArrowBottomImage = styled.Image`
  width: 21px;
  height: 13px;
`;

const SelectedImage = styled(FastImage)`
  width: ${deviceHeight}px;
  height: 228px;
`;

@inject(stores => ({
  userStore: stores.store.userStore,
  contentStore: stores.store.contentStore,
  isLoading: stores.store.contentStore.isLoading,
}))
@withLoading
@observer
class MakeTimeLine extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
    userStore: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      imageURL: '',
      location: '',
      content: '',
      modalVisible: false,
    };
  }

  onClsoe = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  onChangeLocation = text => {
    this.setState({ location: text });
  };

  onChangeContent = text => {
    this.setState({ content: text });
  };

  onSetLocation = location => {
    this.setState({ location, modalVisible: false });
  };

  openImagePicker = async () => {
    const imageInfo = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    });

    if (!imageInfo) {
      return;
    }

    const imageURL = imageInfo.path;
    this.setState({ imageURL });
  };

  makeTimeLine = async () => {
    const { contentStore, userStore, navigation } = this.props;
    const { imageURL, location, content } = this.state;

    if (imageURL.length * location.length * content.length === 0) {
      alert('필요한 정보를 모두 입력해 주세요!');
      return;
    }

    const params = {
      content,
      location,
      imageurl: imageURL,
      user_id: userStore.user_id,
    };

    const res = await contentStore.makeTimeLineByInfos(params);

    if (res) {
      navigation.goBack();
    }
  };

  renderTableView = () => {
    const { imageURL } = this.state;
    const isExistImage = imageURL.length > 0;

    return (
      <TableContainer>
        <AddButtonContainer>
          {!isExistImage ? (
            <React.Fragment>
              <AddImageButton onPress={this.openImagePicker}>
                <PlusImage source={Images.plus} />
              </AddImageButton>
              <AddImageText> 한강사진을 등록해 주세요 :)</AddImageText>
            </React.Fragment>
          ) : (
            <SelectedImage source={{ uri: imageURL }} resizeMode="contain" />
          )}
        </AddButtonContainer>
        <TableRow>
          <BasicInfoText>위치</BasicInfoText>
          <InfoInput
            placeholder="뚝섬 유원지"
            onChangeText={this.onChangeLocation}
            value={this.state.location}
          />
          <RightButton onPress={() => this.setState({ modalVisible: true })}>
            <ArrowBottomImage source={Images.down_arrow} />
          </RightButton>
        </TableRow>
        <ContentsView>
          <InfoInput
            placeholder="지금 한강에서 일어나는 이야기를 들려주세요!"
            multiline
            onChangeText={this.onChangeContent}
            value={this.state.content}
          />
        </ContentsView>
      </TableContainer>
    );
  };

  render() {
    const { modalVisible } = this.state;
    const { userStore } = this.props;

    return (
      <ScrollContainer>
        <LocationModal modalVisible={modalVisible} onPressItem={this.onSetLocation} />
        <KeyboardAwareScrollView
          contentContainerStyle={{
            height: deviceHeight,
            paddingBottom: 50,
            backgroundColor: 'white',
          }}
        >
          <Container>
            <Header>
              <ModalHeader title="한강의 소식을 전해주세요" onClose={this.onClsoe} />
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
          <BottomButton onPress={this.makeTimeLine}>
            <BottomButtonContaienr>
              <BottomText>지금한강 등록하기</BottomText>
            </BottomButtonContaienr>
          </BottomButton>
        </Bottom>
      </ScrollContainer>
    );
  }
}

export default MakeTimeLine;
