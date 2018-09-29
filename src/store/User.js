import { types } from 'mobx-state-tree';

const User = types.model('User', {
  user_id: types.identifier,
  application_seq: types.number,
  application_time: types.string,
  contact: types.string,
  contact_seq: types.number,
  description: types.string,
  meeting_seq: types.number,
  nickname: types.string,
  participants_cnt: types.number,
});

export default User;
