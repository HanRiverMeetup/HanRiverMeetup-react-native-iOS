import { types } from 'mobx-state-tree';

const Comment = types.model('Comment', {
  comment_seq: types.identifierNumber,
  comment: types.string,
  creation_time: types.string,
  meeting_seq: types.number,
  nickname: types.string,
  user_id: types.string,
});

export default Comment;
