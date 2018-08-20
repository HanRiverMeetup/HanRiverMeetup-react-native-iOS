import _ from 'lodash';
import { AsyncStorage } from 'react-native';

const setItem = (key, value) =>
  new Promise((resolve, reject) => {
    AsyncStorage.setItem(key, value, errors => {
      if (_.isEmpty(errors)) {
        resolve(true);
        return;
      }
      reject(_.first(errors));
    });
  });

const getItem = key =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(key, (errors, result) => {
      if (_.isEmpty(errors)) {
        resolve(result);
        return;
      }
      reject(_.first(errors));
    });
  });

const clear = () => AsyncStorage.clear();

export default { clear, setItem, getItem };
