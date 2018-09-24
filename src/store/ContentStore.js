import _ from 'lodash';
import moment from 'moment';
import { flow, types, getRoot } from 'mobx-state-tree';

import Content from './Content';
import Loading from './compose/Loading';

const ContentStore = types.model('ContentStore', {
  contents: types.optional(types.map(Content), {}),
  offset: 0,
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
    const fetchTodayContentsByOffset = flow(function*() {
      const date = moment().format('YYYY-MM-DD');

      const params = {
        date: '2018-09-07',
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

        self.offset += 10;
      } catch (error) {
        alert(error);
      }
    });

    return {
      fetchTodayContentsByOffset: flow(function*() {
        return yield self.withLoading(fetchTodayContentsByOffset)();
      }),
    };
  });

export default WithLoading;
