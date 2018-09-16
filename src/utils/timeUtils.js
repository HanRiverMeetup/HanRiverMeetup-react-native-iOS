import moment from 'moment';

export const timeUtils = {
  toTime(serverTimeFormat) {
    return moment(serverTimeFormat).format('A hh:mm');
  },
};
