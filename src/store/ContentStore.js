import _ from 'lodash';
import moment from 'moment';
import { flow, types, getRoot } from 'mobx-state-tree';

import Content from './Content';
import Loading from './compose/Loading';

const ContentStore = types.model('ContentStore', {
  contents: types.optional(types.map(Content), {}),
  offset: types.optional(types.number, 0),
});

const WithLoading = types
  .compose(
    Loading,
    ContentStore
  )
  .views(self => ({
    get allContents() {
      return Array.from(self.contents.values());
    },
  }))
  .actions(self => {
    const resetContents = () => {
      self.offset = 0;
      self.contents = {};
    };

    const fetchTodayContentsByOffset = flow(function*() {
      const date = moment().format('YYYY-MM-DD');

      const params = {
        date,
        offset: self.offset,
        limit: 20,
      };

      try {
        const contents = yield getRoot(self).FetchTimeLinesByOffset(params);

        contents.map(content =>
          self.contents.put({
            timeline_seq: content.timeline_seq,
            user_id: content.user_id,
            location: content.location,
            imageurl: content.imageurl,
            creation_time: content.creation_time,
            startTime: content.startTime,
            endTime: content.endTime,
            nickname: content.nickname,
            content: content.content,
          })
        );

        self.offset += 20;
      } catch (error) {
        setTimeout(() => {
          alert(error);
        }, 300);
      }
    });

    const makeTimeLineByInfos = flow(function*(infos) {
      try {
        const res = yield getRoot(self).makeTimeLineByInfos(infos);
        resetContents();
        fetchTodayContentsByOffset();
        return res;
      } catch (error) {
        setTimeout(() => {
          alert(error);
        }, 300);
      }
    });

    return {
      fetchTodayContentsByOffset: flow(function*() {
        return yield self.withLoading(fetchTodayContentsByOffset)();
      }),
      makeTimeLineByInfos: flow(function*(infos) {
        return yield self.withLoading(_.partial(makeTimeLineByInfos, infos))();
      }),
      resetContents,
    };
  });

export default WithLoading;
