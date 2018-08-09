import { types } from 'mobx-state-tree';

import UserStore from './UserStore';

const Store = types.model('Store', {
  userStore: types.optional(UserStore, UserStore.create()),
});

export default Store;
