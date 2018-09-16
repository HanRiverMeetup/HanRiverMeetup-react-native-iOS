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
  .views(self => ({
    get allRooms() {
      return Array.from(self.rooms.values());
    },
  }))
  .actions(self => {
    const fetchRoomsBySeq = flow(function*(seq) {
      const params = {
        activity_seq: seq,
      };
      const meetingRooms = yield getRoot(self).fetchRoomsBySeq(params);

      meetingRooms.map(meetingRoom =>
        self.rooms.put({
          meeting_seq: meetingRoom.meeting_seq,
          activity_seq: meetingRoom.activity_seq,
          user_id: meetingRoom.user_id,
          description: meetingRoom.description,
          participants_cnt: meetingRoom.participants_cnt,
          meeting_location: meetingRoom.meeting_location,
          meeting_time: meetingRoom.meeting_time,
          expected_cost: meetingRoom.expected_cost,
          creation_time: meetingRoom.creation_time,
          modification_time: meetingRoom.modification_time,
          title: meetingRoom.title,
          contact: meetingRoom.contact,
          contact_seq: meetingRoom.contact_seq,
          nickname: meetingRoom.nickname,
          lat: meetingRoom.lat,
          lng: meetingRoom.lng,
        })
      );
    });

    const getRoomInfoBySeq = seq => self.rooms.get(seq);

    const makeRoomByInfos = flow(function*(roomInfos) {
      try {
        yield getRoot(self).makeRoom(roomInfos);
      } catch (error) {
        setTimeout(() => {
          alert('방생성에 실패했습니다!');
        }, 300);
      }
    });

    return {
      fetchRoomsBySeqence: flow(function*(seqence) {
        return yield self.withLoading(_.partial(fetchRoomsBySeq, seqence))();
      }),
      getRoomInfoBySeq,
      makeRoom: flow(function*(roomInfos) {
        return yield self.withLoading(_.partial(makeRoomByInfos, roomInfos))();
      }),
    };
  });

export default WithLoading;
