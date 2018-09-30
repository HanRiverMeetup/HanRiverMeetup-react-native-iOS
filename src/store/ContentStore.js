import _ from 'lodash';
import moment from 'moment';
import { flow, types, getRoot } from 'mobx-state-tree';

import Content from './Content';
import Event from './Event';
import Loading from './compose/Loading';

const ContentStore = types.model('ContentStore', {
  events: types.optional(types.map(Event), {}),
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
    get allEvents() {
      return Array.from(self.events.values());
    },
  }))
  .actions(self => {
    const resetContents = () => {
      self.offset = 0;
      self.contents.clear();
    };

    const fetchTodayContentsByOffset = flow(function*() {
      const date = moment().format('YYYY-MM-DD');

      const params = {
        date,
        offset: self.offset,
        limit: 20,
      };

      try {
        const contents = yield getRoot(self).fetchTimeLinesByOffset(params);

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

    const fetchEvents = flow(function*() {
      try {
        const events = yield getRoot(self).fetchEvents();

        events.map(event =>
          self.events.put({
            event_seq: event.event_seq,
            imageurl: event.imageurl,
            isongoing: event.isongoing,
            creation_time: event.creation_time,
            url: event.url,
          })
        );
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
      fetchEvents: flow(function*() {
        return yield self.withLoading(fetchEvents)();
      }),
    };
  });

export default WithLoading;
