import React from 'react';
import { Observer } from 'mobx-react';
import FrameLoading from 'react-native-frame-loading';
import hoistNonReactStatic from 'hoist-non-react-statics';
import styled from 'styled-components';
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

const withLoading = WrappedComponent => {
  class WithLoading extends React.Component {
    static propTypes = {
      isLoading: PropTypes.bool.isRequired,
    };

    componentDidMount = () => {};

    render() {
      const { isLoading } = this.props;
      return (
        <React.Fragment>
          <Observer>
            {() => (
              <React.Fragment>
                <WrappedComponent {...this.props} />
                <FrameLoading
                  animating={isLoading}
                  views={VIEWS}
                  duration={150}
                  modalProps={{ transparent: true }}
                  loadingContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    backgroundColor: 'rgba(49,49,49,0.6)',
                  }}
                />
              </React.Fragment>
            )}
          </Observer>
        </React.Fragment>
      );
    }
  }

  hoistNonReactStatic(WithLoading, WrappedComponent);

  return WithLoading;
};

withLoading.defaultProps = {
  isLoading: PropTypes.bool.isRequired,
};

export default withLoading;
