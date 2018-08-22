import { types } from 'mobx-state-tree';

import UserStore from './UserStore';
import serverInfo from '../configs';

const ACCESS_ENDPOINT = `${serverInfo.url}/access`;

const Store = types
  .model('Store', {
    userStore: types.optional(UserStore, UserStore.create()),
  })
  .views(self => {
    const Fetch = async (method, url, params) => {
      const headers = {
        'Content-Type': 'application/json',
      };

      if (self.userStore.user_id && self.userStore.hangangToken) {
        headers.hangang_token = self.userStore.hangangToken;
        headers.user_id = self.userStore.user_id;
      }

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg);
      }

      return response.json();
    };

    const loginValidate = params => Fetch('POST', `${ACCESS_ENDPOINT}/loginValidate`, params);
    const registUser = params => Fetch('POST', `${ACCESS_ENDPOINT}/registUser`, params);

    return {
      loginValidate,
      registUser,
    };
  });

export default Store;
