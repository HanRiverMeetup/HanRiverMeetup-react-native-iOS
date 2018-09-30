import React from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { SafeAreaView } from 'react-navigation';

import withLoading from '../HOC/withLoading';
import ModalHeader from '../components/ModalHeader';
import BaseText from '../components/BaseText';
import { dateUtils } from '../utils/dateUtils';

const { width: deviceWidth } = Dimensions.get('window');

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: white;
`;

const Header = styled.View`
  flex: 1;
`;

const Body = styled.View`
  flex: 4;
`;

const Sections = styled.SectionList`
  margin-left: 24px;
`;

const SectionHeaderText = styled(BaseText)`
  color: #333333;
  font-size: 14px;
  background-color: white;
  width: 40px;
`;

const NotiText = styled(BaseText)`
  font-family: NanumSquareB;
  color: #333333;
  font-size: 14px;
`;

const NotiView = styled.View`
  margin-bottom: 23px;
`;

const SectonHeaderView = styled.View`
  padding-vertical: 19px;
  justify-content: center;
  background-color: white;
`;

const AbsoluteLine = styled.View`
  width: ${deviceWidth}px;
  height: 1px;
  background-color: #dcdcdc;
  position: absolute;
`;

const TimeText = styled(BaseText)`
  color: #949494;
  font-size: 14px;
  margin-top: 7px;
`;

@inject(stores => ({
  alarmStore: stores.store.alarmStore,
}))
@withLoading
@observer
export default class Alarms extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    alarmStore: PropTypes.shape({}).isRequired,
  };

  onClsoe = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  keyExtractor = item => `${item.notification_seq}`;

  renderSectionHeader = ({ section: { title } }) => (
    <SectonHeaderView>
      <AbsoluteLine />
      <SectionHeaderText>{title}</SectionHeaderText>
    </SectonHeaderView>
  );

  renderItem = ({ item }) => (
    <NotiView>
      <NotiText>{item.message}</NotiText>
      <TimeText>{dateUtils.toYYYYMMDD(item.creation_time)}</TimeText>
    </NotiView>
  );

  renderEmptyView = () => (
    <NotiView>
      <NotiText>알림이 없습니다</NotiText>
    </NotiView>
  );

  render() {
    const { alarmStore } = this.props;
    const { todayAlarms, lastAlarms } = alarmStore;

    const sections = [];

    if (todayAlarms.length > 0) {
      sections.push({ title: 'TODAY', data: todayAlarms });
    }

    if (lastAlarms.length > 0) {
      sections.push({ title: 'LAST', data: lastAlarms });
    }

    return (
      <Container>
        <Header>
          <ModalHeader title="내 소식" onClose={this.onClsoe} />
        </Header>
        <Body>
          <Sections
            renderItem={this.renderItem}
            renderSectionHeader={this.renderSectionHeader}
            sections={sections}
            keyExtractor={this.keyExtractor}
            ListEmptyComponent={this.renderEmptyView}
          />
        </Body>
      </Container>
    );
  }
}
