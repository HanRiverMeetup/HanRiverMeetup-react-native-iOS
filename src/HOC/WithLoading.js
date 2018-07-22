import React from 'react';
import styled from 'styled-components';
import FrameLoading from 'react-native-frame-loading';
import PropTypes from 'prop-types';

const Container = styled.View`
  flex: 1;
`;

const withLoading = Component => {
  const Sub = ({ isLoading, ...rest }) =>
    isLoading ? (
      <Container>
        <FrameLoading />
      </Container>
    ) : (
      <Component {...rest} />
    );

  Sub.propTypes = {
    isLoading: PropTypes.bool.isRequired,
  };
};

withLoading.propTypes = {
  Component: PropTypes.element,
};

export default withLoading;
