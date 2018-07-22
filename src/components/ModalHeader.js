import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Images from '@assets';

import BaseText from './BaseText';

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 25;
`;

const TitleText = styled(BaseText)`
  font-size: 18;
  color: #333333;
`;

const CloseButton = styled.TouchableOpacity``;

const CloseImg = styled.Image`
  width: 25px;
  height: 25px;
`;

const ModalHeader = ({ title, onClose, style }) => (
  <Container style={style}>
    <TitleText>{title}</TitleText>
    <CloseButton onPress={onClose}>
      <CloseImg source={Images.close_icon} />
    </CloseButton>
  </Container>
);

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  style: PropTypes.oneOf(
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.number,
    PropTypes.shape({})
  ),
};

ModalHeader.defaultProps = {
  style: {},
};

export default ModalHeader;
