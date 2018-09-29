import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Base = styled.Text`
  font-family: NanumSquareR;
  font-size: 18;
  color: white;
`;

const BaseText = ({ style, children }) => <Base style={style}>{children}</Base>;

BaseText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  style: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.number,
    PropTypes.array,
  ]),
};

BaseText.defaultProps = {
  style: {},
};

export default BaseText;
