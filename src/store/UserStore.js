// import _ from 'lodash';
import { flow, types } from 'mobx-state-tree';

import { AccessAPI } from '../APIManager';

const UserStore = types
  .model('User', {
    nickName: types.optional(types.string, ''),
    userId: types.optional(types.string, ''),
  })
  .actions(() => {
    const loginValidate = flow(function*(fbToken, fbId) {
      const params = { access_token: fbToken, user_id: fbId };
      const response = yield AccessAPI.loginValidate(params);
      console.log('response', response);
    });

    return { loginValidate };
  });

export default UserStore;
