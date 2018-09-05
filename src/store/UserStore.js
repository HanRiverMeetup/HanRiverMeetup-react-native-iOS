import _ from 'lodash';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { flow, types, getRoot } from 'mobx-state-tree';

import Loading from './compose/Loading';

const UserStore = types.model('UserStore', {
  nickName: types.optional(types.maybeNull(types.string), ''),
  hangangToken: types.optional(types.string, ''),
  fbToken: types.optional(types.string, ''),
  user_id: types.optional(types.string, ''),
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
      const result = yield LoginManager.logInWithReadPermissions(['public_profile']);

      if (result.grantedPermissions) {
        const data = yield AccessToken.getCurrentAccessToken();

        const loginInfo = {
          access_token: data.accessToken,
          user_id: data.userID,
        };

        const res = yield getRoot(self).loginValidate(loginInfo);
        self.nickName = res.nickname;
        self.user_id = res.user_id;
        self.fbToken = res.access_token;
        self.hangangToken = res.hangang_token;
      } else {
        throw new Error('페이스북 로그인을 승인해주세요');
      }
      return self.nickName;
    });

    const loginValidate = flow(function*(loginInfo) {
      const res = yield getRoot(self).loginValidate(loginInfo);

      self.nickName = res.nickname;
      self.user_id = res.user_id;
      self.fbToken = res.access_token;
      self.hangangToken = res.hangang_token;

      return self.nickName;
    });

    const registUser = flow(function*(nickname) {
      const params = {
        nickname,
        user_id: self.user_id,
      };

      yield getRoot(self).registUser(params);
    });

    return {
      logInWithFB: flow(function*() {
        return yield self.withLoading(logInWithFB)();
      }),
      loginValidate,
      registUser: flow(function*(nickname) {
        return yield self.withLoading(_.partial(registUser, nickname))();
      }),
    };
  });

export default WithLoading;
