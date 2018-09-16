import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonContainer = styled.TouchableHighlight`
  justify-content: center;
  align-items: center;
`;

const BaseButton = ({ style, children, onPress, underlayColor }) => (
  <ButtonContainer onPress={onPress} underlayColor={underlayColor} style={style}>
    {children}
  </ButtonContainer>
);

BaseButton.propTypes = {
  style: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array]),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  underlayColor: PropTypes.string,
  onPress: PropTypes.func,
};

BaseButton.defaultProps = { underlayColor: 'rgba(240,256,256,0.7)', style: {}, onPress: () => {} };

export default BaseButton;
