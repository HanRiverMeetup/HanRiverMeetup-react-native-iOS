import _ from 'lodash';
import { flow, types, getRoot } from 'mobx-state-tree';

import Alarm from './Alarm';
import Loading from './compose/Loading';
import { dateUtils } from '../utils/dateUtils';

const AlarmStore = types.model('AlarmStore', {
  alarms: types.optional(types.map(Alarm), {}),
});

const WithLoading = types
  .compose(
    Loading,
    AlarmStore
  )
  .views(self => ({
    get todayAlarms() {
      return Array.from(self.alarms.values()).filter(
        alarm => dateUtils.toYYYYMMDD(alarm.creation_time) === dateUtils.toYYYYMMDD(new Date())
      );
    },
    get lastAlarms() {
      return Array.from(self.alarms.values()).filter(
        alarm => dateUtils.toYYYYMMDD(alarm.creation_time) !== dateUtils.toYYYYMMDD(new Date())
      );
    },
  }))
  .actions(self => {
    const fetchAlarmsById = flow(function*(user_id) {
      const params = {
        user_id,
      };

      const alarms = yield getRoot(self).fetchAlarmsById(params);

      alarms.map(alarm =>
        self.alarms.put({
          notification_seq: alarm.notification_seq,
          user_id: alarm.user_id,
          message: alarm.message,
          creation_time: alarm.creation_time,
          isdeleted: alarm.isdeleted,
        })
      );
    });

    return {
      fetchAlarmsById: flow(function*(user_id) {
        return yield self.withLoading(_.partial(fetchAlarmsById, user_id))();
      }),
    };
  });

export default WithLoading;
