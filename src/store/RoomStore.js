import _ from 'lodash';
import { flow, types, getRoot, applySnapshot } from 'mobx-state-tree';

import Room from './Room';
import User from './User';
import Loading from './compose/Loading';

const Member = types
  .model('Member', {
    memberMap: types.optional(types.map(User), {}),
  })
  .views(self => ({
    get member() {
      return self.memberMap;
    },
  }))
  .actions(self => {
    const updateMember = mem => {
      self.memberMap.put({
        user_id: mem.user_id,
        application_seq: mem.application_seq,
        application_time: mem.application_time,
        contact: mem.contact,
        contact_seq: mem.contact_seq,
        description: mem.description,
        meeting_seq: mem.meeting_seq,
        nickname: mem.nickname,
        participants_cnt: mem.participants_cnt,
      });
    };

    return {
      updateMember,
    };
  });

const RoomStore = types.model('RoomStore', {
  rooms: types.optional(types.map(Room), {}),
  myRooms: types.optional(types.map(Room), {}),
  requestRooms: types.optional(types.map(Room), {}),
  meetingMembers: types.optional(types.array(Member), []),
});

const WithLoading = types
  .compose(
    Loading,
    RoomStore,
    Member
  )
  .views(self => ({
    get allRooms() {
      return Array.from(self.rooms.values());
    },
    get myAllRooms() {
      return Array.from(self.myRooms.values());
    },
    get requestAllRooms() {
      return Array.from(self.requestRooms.values());
    },
    get allMembers() {
      return self.meetingMembers.map(member => member.member);
    },
  }))
  .actions(self => {
    const updateRoom = (model, fetchedRooms) => {
      fetchedRooms.map(meetingRoom =>
        model.put({
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
    };

    const fetchRoomsBySeq = flow(function*(seq) {
      const params = {
        activity_seq: seq,
      };
      const meetingRooms = yield getRoot(self).fetchRoomsBySeq(params);
      updateRoom(self.rooms, meetingRooms);
    });

    const fetchMyRoomsById = flow(function*(user_id) {
      const params = {
        user_id,
      };

      try {
        const myRooms = yield getRoot(self).fetchMyRoomsById(params);
        updateRoom(self.myRooms, myRooms);
      } catch (error) {
        setTimeout(() => {
          alert(error);
        }, 300);
      }
    });

    const fetchRequestRoomsById = flow(function*(user_id) {
      const params = {
        user_id,
      };

      try {
        const requestRooms = yield getRoot(self).fetchRequestRoomById(params);
        updateRoom(self.requestRooms, requestRooms);
      } catch (error) {
        setTimeout(() => {
          alert(error);
        }, 300);
      }
    });

    const fetchMeetingMemberBySeq = flow(function*(seq) {
      const params = {
        meeting_seq: seq,
      };

      try {
        const members = yield getRoot(self).fetchMeetingMemberBySeq(params);
        const memberModel = Member.create();
        console.log('members', members);

        members.map(mem => memberModel.updateMember(mem));

        self.meetingMembers.push(memberModel);
      } catch (error) {
        setTimeout(() => {
          alert(error);
        }, 300);
      }
    });

    const getRoomInfoBySeq = seq => self.rooms.get(seq);

    const makeRoomByInfos = flow(function*(roomInfos) {
      try {
        return yield getRoot(self).makeRoom(roomInfos);
      } catch (error) {
        setTimeout(() => {
          alert(error);
        }, 300);
      }
    });

    const joinRoomByGuestInfos = flow(function*(guestInfos) {
      return yield getRoot(self).joinRoom(guestInfos);
    });

    return {
      fetchRoomsBySeqence: flow(function*(seqence) {
        return yield self.withLoading(_.partial(fetchRoomsBySeq, seqence))();
      }),
      getRoomInfoBySeq,
      makeRoom: flow(function*(roomInfos) {
        return yield self.withLoading(_.partial(makeRoomByInfos, roomInfos))();
      }),
      joinRoomByGuestInfos: flow(function*(guestInfos) {
        return yield self.withLoading(_.partial(joinRoomByGuestInfos, guestInfos))();
      }),
      fetchMyRoomsById: flow(function*(user_id) {
        return yield self.withLoading(_.partial(fetchMyRoomsById, user_id))();
      }),
      fetchRequestRoomsById: flow(function*(user_id) {
        return yield self.withLoading(_.partial(fetchRequestRoomsById, user_id))();
      }),
      fetchMeetingMemberBySeq: flow(function*(seq) {
        return yield self.withLoading(_.partial(fetchMeetingMemberBySeq, seq))();
      }),
    };
  });

export default WithLoading;
