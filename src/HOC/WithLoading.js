import React from 'react';
import { Observer } from 'mobx-react';
import FrameLoading from 'react-native-frame-loading';
import PropTypes from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';

const withLoading = WrappedComponent => {
  class WithLoading extends React.Component {
    render() {
      return (
        <React.Fragment>
          <Observer>{() => console.log(this.props)}</Observer>
        </React.Fragment>
      );
    }
  }

  hoistNonReactStatic(WithLoading, WrappedComponent);

  return WithLoading;
};

export default withLoading;
