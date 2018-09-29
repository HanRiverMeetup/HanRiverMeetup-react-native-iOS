import moment from 'moment';

export const dateUtils = {
  toMMDDT(serverTimeFormat) {
    return moment(serverTimeFormat).format('MM.DD. HH:mm');
  },
  toKRDate(serverTimeFormat) {
    return moment(serverTimeFormat).format('MMd월 DD일 시간 HH:mm');
  },
};
