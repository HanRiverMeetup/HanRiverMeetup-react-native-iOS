import React from 'react';
import { Provider } from 'mobx-react';

import AppWithNavigationState from './navigators';
import Store from './store';

export default class App extends React.Component {
  store = Store.create();
  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
