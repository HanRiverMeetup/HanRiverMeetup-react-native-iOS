import { types } from 'mobx-state-tree';

import UserStore from './UserStore';
import RoomStore from './RoomStore';
import serverInfo from '../configs';

const ACCESS_ENDPOINT = `${serverInfo.url}/access`;
const MEETING_HOST_ENDPOINT = `${serverInfo.url}/host/meeting`;
const MEETINGS_HOST_ENDPOINT = `${serverInfo.url}/host/meetings`;

const Store = types
  .model('Store', {
    userStore: types.optional(UserStore, UserStore.create()),
    roomStore: types.optional(RoomStore, RoomStore.create()),
  })
  .views(self => {
    const Fetch = async (method, url, params = undefined) => {
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
    const fetchRoomsBySeq = params =>
      Fetch('GET', `${MEETINGS_HOST_ENDPOINT}/week/${params.activity_seq}`);

    return {
      loginValidate,
      registUser,
      fetchRoomsBySeq,
    };
  });

export default Store;
