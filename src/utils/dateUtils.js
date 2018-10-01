import moment from 'moment';

export const dateUtils = {
  toMMDDT(serverTimeFormat) {
    return moment(serverTimeFormat).format('MM.DD. HH:mm');
  },
  toKRDate(serverTimeFormat) {
    return moment(serverTimeFormat).format('MM월 DD일 시간 HH:mm');
  },
  toYYYYMMDD(serverTimeFormat) {
    return moment(serverTimeFormat).format('YYYY. MM. DD');
  },
};
