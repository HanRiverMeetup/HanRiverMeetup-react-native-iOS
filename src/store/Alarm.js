import { types } from 'mobx-state-tree';

const Alarm = types.model('Alarm', {
  notification_seq: types.identifierNumber,
  user_id: types.string,
  message: types.string,
  creation_time: types.string,
  isdeleted: types.boolean,
});

export default Alarm;
