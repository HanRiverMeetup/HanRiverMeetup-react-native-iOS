import { types } from 'mobx-state-tree';

const Room = types.model('Room', {
  meeting_seq: types.identifier,
  activity_seq: types.number,
  user_id: types.string,
  description: types.maybeNull(types.string),
  participants_cnt: types.number,
  meeting_location: types.string,
  meeting_time: types.string,
  expected_cost: types.number,
  creation_time: types.string,
  modification_time: types.maybeNull(types.string),
  title: types.string,
  contact: types.maybeNull(types.string),
  contact_seq: types.number,
  nickname: types.maybeNull(types.string),
  lat: types.maybeNull(types.number),
  lng: types.maybeNull(types.number),
});

export default Room;
