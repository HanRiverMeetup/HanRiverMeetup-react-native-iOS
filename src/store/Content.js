import { types } from 'mobx-state-tree';

const Content = types.model('Content', {
  timeline_seq: types.identifierNumber,
  user_id: types.string,
  location: types.string,
  imageurl: types.string,
  creation_time: types.string,
  startTime: types.maybeNull(types.string),
  endTime: types.maybeNull(types.string),
  nickname: types.string,
  content: types.string,
});

export default Content;
