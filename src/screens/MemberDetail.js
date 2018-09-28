import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';
import { observer, inject } from 'mobx-react';
import { SafeAreaView } from 'react-navigation';

import withLoading from '../HOC/withLoading';
import ModalHeader from '../components/ModalHeader';

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

const Bottom = styled.View`
  flex: 1;
`;

@inject(stores => ({
  userStore: stores.store.userStore,
  roomStore: stores.store.roomStore,
}))
@withLoading
@observer
export default class MemberDetail extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
  };

  onClsoe = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    return (
      <Container>
        <Header>
          <ModalHeader title="" onClose={this.onClsoe} />
        </Header>
        <Body />
        <Bottom />
      </Container>
    );
  }
}
