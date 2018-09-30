import { types } from 'mobx-state-tree';

const Event = types.model('Event', {
  event_seq: types.identifierNumber,
  imageurl: types.string,
  isongoing: types.boolean,
  creation_time: types.string,
  url: types.string,
});

export default Event;
