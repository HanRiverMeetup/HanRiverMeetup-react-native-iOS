import _ from 'lodash';
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import FastImage from 'react-native-fast-image';
import Images from '@assets';

import BaseText from './BaseText';
import { dateUtils } from '../utils/dateUtils';

const PinImage = styled(FastImage)`
  width: 10px;
  height: 13px;
  margin-right: 9px;
`;

const ListText = styled.Text`
  font-family: NanumSquareR;
  font-size: 14;
  color: #949494;
  text-decoration: underline;
  align-self: center;
  margin-vertical: 48px;
`;

const ListView = styled.View`
  padding-horizontal: 24px;
  padding-top: 23px;
`;

const CardTitle = styled(BaseText)`
  font-family: NanumSquareB;
  color: #333333;
  font-size: 14px;
`;

const SubTitleView = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: 9px;
`;

const CardSubTitle = styled(BaseText)`
  color: #949494;
  font-size: 12px;
  margin-right: 9px;
`;

const PartiTitle = styled(BaseText)`
  font-family: NanumSquareB;
  color: #333333;
  font-size: 14px;
  margin-top: 11px;
`;

const SkyBlueLabel = styled.View`
  width: 4px;
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  background-color: #2186f8;
`;

const ProfileContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-right: 19px;
`;

const HorizontalScrollView = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: { paddingTop: 11 },
})`
  padding-bottom: 21px;
`;

const ProfileView = styled(FastImage)`
  width: 61px;
  height: 61px;
  border-radius: 30.5px;
`;

@inject(stores => ({
  roomStore: stores.store.roomStore,
}))
@observer
export default class MyRooms extends Component {
  static propTypes = {
    item: PropTypes.shape({}).isRequired,
    index: PropTypes.number.isRequired,
    roomStore: PropTypes.shape({}).isRequired,
    onPressProfile: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    const { roomStore, item } = this.props;
    roomStore.fetchMeetingMemberBySeq(item.meeting_seq);
  };

  render() {
    const { item, index, roomStore } = this.props;
    const { allMembers } = roomStore;
    const memberMap = allMembers[index];

    return (
      <ListView>
        <SkyBlueLabel />
        <CardTitle>{item.title}</CardTitle>
        <SubTitleView>
          <PinImage source={Images.icon_pin} />
          <CardSubTitle>{item.meeting_location}</CardSubTitle>
          <CardSubTitle>{dateUtils.toKRDate(item.meeting_time)}</CardSubTitle>
        </SubTitleView>

        <CardTitle>신청자</CardTitle>
        {memberMap && memberMap.size > 0 ? (
          <HorizontalScrollView>
            {Array.from(memberMap.values()).map(member => (
              <ProfileContainer
                key={member.user_id}
                onPress={_.partial(this.props.onPressProfile, member)}
              >
                <ProfileView
                  source={{
                    uri: `http://graph.facebook.com/v3.1/${member.user_id}/picture?type=large`,
                  }}
                />
                <PartiTitle>{member.nickname}</PartiTitle>
              </ProfileContainer>
            ))}
          </HorizontalScrollView>
        ) : (
          <ListText>곧 신청자가 올거예요!</ListText>
        )}
      </ListView>
    );
  }
}
