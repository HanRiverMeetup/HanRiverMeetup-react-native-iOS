import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Base = styled.Text`
  font-family: NanumSquareR;
  font-size: 18;
  color: white;
`;

const BaseText = ({ style, children, onPress }) => (
  <Base style={style} onPress={onPress}>
    {children}
  </Base>
);

BaseText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  style: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.number,
    PropTypes.array,
  ]),
  onPress: PropTypes.func,
};

BaseText.defaultProps = {
  style: {},
  onPress: () => {},
};

export default BaseText;
