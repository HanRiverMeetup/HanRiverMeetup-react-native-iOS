import React from 'react';
import styled from 'styled-components';
import FrameLoading from 'react-native-frame-loading';
import PropTypes from 'prop-types';

import Images from '@assets';

const LoadingImg = styled.Image`
  width: 40;
  height: 40;
`;

const VIEWS = [
  <LoadingImg key={1} source={Images.loading_01} />,
  <LoadingImg key={2} source={Images.loading_02} />,
  <LoadingImg key={3} source={Images.loading_03} />,
  <LoadingImg key={4} source={Images.loading_04} />,
  <LoadingImg key={5} source={Images.loading_05} />,
  <LoadingImg key={6} source={Images.loading_06} />,
];

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const WithLoadingContainer = ({ children, isLoading, style }) =>
  isLoading ? (
    <Container style={style}>
      <FrameLoading
        animating={isLoading}
        views={VIEWS}
        duration={250}
        modalProps={{ transparent: true }}
        loadingContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: 'rgba(49,49,49,0.6)',
        }}
      />
      {children}
    </Container>
  ) : (
    <Container style={style}>{children}</Container>
  );

WithLoadingContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  isLoading: PropTypes.bool.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.number,
    PropTypes.object,
  ]),
};

WithLoadingContainer.defaultProps = {
  style: {},
};

export default WithLoadingContainer;
