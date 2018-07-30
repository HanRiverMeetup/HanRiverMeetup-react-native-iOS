import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonContainer = styled.TouchableHighlight`
  justify-content: center;
  align-items: center;
`;

const BaseButton = props => <ButtonContainer {...props}>{props.children}</ButtonContainer>;

BaseButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  underlayColor: PropTypes.string,
};

BaseButton.defaultProps = { underlayColor: 'rgba(240,256,256,0.7)' };

export default BaseButton;
