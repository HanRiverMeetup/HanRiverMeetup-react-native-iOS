import _ from 'lodash';
import { flow, types, getRoot } from 'mobx-state-tree';

import Room from './Room';
import Loading from './compose/Loading';

const RoomStore = types.model('RoomStore', {
  rooms: types.optional(types.map(Room), {}),
});

const WithLoading = types
  .compose(
    Loading,
    RoomStore
  )
  .actions(self => {
    const fetchRoomsBySeq = flow(function*(seq) {
      const params = {
        activity_seq: seq,
      };
      const res = yield getRoot(self).fetchRoomsBySeq(params);
    });

    return {
      fetchRoomsBySeq: flow(function*(seq) {
        return yield self.withLoading(_.partial(fetchRoomsBySeq, seq))();
      }),
    };
  });

export default WithLoading;
