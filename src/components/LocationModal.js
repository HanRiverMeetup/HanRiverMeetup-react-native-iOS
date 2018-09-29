import _ from 'lodash';
import React from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import BaseText from './BaseText';
import BaseButton from './BaseButton';

const LOCATIONS = ['뚝섬유원지', '세빛둥둥섬', '이촌', '반포대교'];

const Container = styled.View`
  flex: 1;
`;

const Header = styled.View`
  flex: 1;
`;

const Body = styled.View`
  flex: 5;
`;

const ModalContsiner = styled.View`
  flex: 1;
`;

const LocationList = styled.FlatList`
  flex: 1;
`;

const LocationText = styled(BaseText)`
  margin-bottom: 20px;
`;

export default class LocationModal extends React.Component {
  static propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    onPressItem: PropTypes.func.isRequired,
  };

  pressItem = item => {
    const { onPressItem } = this.props;
    onPressItem(item);
  };

  keyExtractor = item => item;

  renderList = ({ item }) => (
    <BaseButton underlayColor="transparent" onPress={_.partial(this.pressItem, item)}>
      <LocationText>{item}</LocationText>
    </BaseButton>
  );

  render() {
    const { modalVisible } = this.props;

    return (
      <Container>
        <Modal isVisible={modalVisible}>
          <ModalContsiner>
            <Header />
            <Body>
              <LocationList
                data={LOCATIONS}
                renderItem={this.renderList}
                keyExtractor={this.keyExtractor}
              />
            </Body>
          </ModalContsiner>
        </Modal>
      </Container>
    );
  }
}
