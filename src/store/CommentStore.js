import _ from 'lodash';
import { flow, types, getRoot } from 'mobx-state-tree';

import Comment from './Comment';
import Loading from './compose/Loading';

const CommentStore = types.model('CommentStore', {
  comments: types.optional(types.map(Comment), {}),
});

const WithLoading = types
  .compose(
    Loading,
    CommentStore
  )
  .views(self => ({
    get allComments() {
      return Array.from(self.comments.values());
    },
  }))
  .actions(self => {
    const fetchCommentByMeetingSeq = flow(function*(seq) {
      const params = {
        meeting_seq: seq,
      };
      const comments = yield getRoot(self).fetchCommentByMeetingSeq(params);

      comments.map(comment =>
        self.comments.put({
          comment_seq: comment.comment_seq,
          comment: comment.comment,
          creation_time: comment.creation_time,
          meeting_seq: comment.meeting_seq,
          nickname: comment.nickname,
          user_id: comment.user_id,
        })
      );
    });

    const registerCommentByCommentInfo = flow(function*(commentInfos) {
      try {
        const res = yield getRoot(self).registerComment(commentInfos);
        fetchCommentByMeetingSeq(res.meeting_seq);
      } catch (error) {
        console.log(error);
        setTimeout(() => {
          alert(error);
        }, 300);
      }
    });

    return {
      fetchCommentByMeetingSeq: flow(function*(seqence) {
        return yield self.withLoading(_.partial(fetchCommentByMeetingSeq, seqence))();
      }),
      registerCommentByCommentInfo: flow(function*(commentsJSON) {
        return yield self.withLoading(_.partial(registerCommentByCommentInfo, commentsJSON))();
      }),
    };
  });

export default WithLoading;
