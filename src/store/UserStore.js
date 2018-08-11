import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { flow, types } from 'mobx-state-tree';

import { AccessAPI } from '../APIManager';
import Loading from './compose/Loading';

const UserStore = types.model('UserStore', {
  nickName: types.optional(types.string, ''),
  hanganToken: types.optional(types.string, ''),
  fbToken: types.optional(types.string, ''),
  fbId: types.optional(types.string, ''),
});

const WithLoading = types
  .compose(
    Loading,
    UserStore
  )
  .views(self => ({
    get token() {
      return self.fbToken;
    },
  }))
  .actions(self => {
    const logInWithFB = flow(function*() {
      try {
        const result = yield LoginManager.logInWithReadPermissions(['public_profile']);

        if (result.grantedPermissions.length > 0) {
          const data = yield AccessToken.getCurrentAccessToken();

          const loginInfo = {
            access_token: data.accessToken,
            user_id: data.userID,
          };

          const res = yield AccessAPI.loginValidate(loginInfo);
          self.nickName = res.nickname;
          self.fbId = res.fbId;
          self.fbToken = res.access_token;
          self.hanganToken = res.hangang_token;
        } else {
          alert('no permisson');
        }
      } catch (error) {
        alert(error.message);
      }
    });

    return {
      logInWithFB: flow(function*() {
        return yield self.withLoading(logInWithFB)();
      }),
    };
  });

export default WithLoading;
